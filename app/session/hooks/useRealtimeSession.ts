import { ESessionVoice } from '@/enums/session-voice'
import api from '@/services/api'
import { clientTools, clientToolsSchema } from '@/utils/tools'
import { Audio } from 'expo-av'
import { useEffect, useRef, useState } from 'react'
import InCallManager from 'react-native-incall-manager'
import {
	mediaDevices,
	MediaStream,
	RTCPeerConnection,
} from 'react-native-webrtc-web-shim'

interface IUseRealtimeSessionProps {
	instructions?: string
}

export function useRealtimeSession({
	instructions = 'Você é brasileira e é uma professora de Inglês.',
}: IUseRealtimeSessionProps = {}) {
	const [isSessionActive, setIsSessionActive] = useState(false)
	const [isConnecting, setIsConnecting] = useState(false)
	const [events, setEvents] = useState<any[]>([])
	const [transcript, setTranscript] = useState('')
	const [isMuted, setIsMuted] = useState(false)
	const [dataChannel, setDataChannel] = useState<null | ReturnType<
		RTCPeerConnection['createDataChannel']
	>>(null)
	const peerConnection = useRef<null | RTCPeerConnection>(null)
	const [localMediaStream, setLocalMediaStream] = useState<null | MediaStream>(
		null
	)
	const remoteMediaStream = useRef<MediaStream>(new MediaStream())
	const connectionAttemptRef = useRef<boolean>(false)

	const configureTools = (dc: RTCPeerConnection['createDataChannel']) => {
		console.log('Configuring the client side tools')
		const event = {
			type: 'session.update',
			session: {
				modalities: ['text', 'audio'],
				instructions,
				tools: clientToolsSchema,
			},
		}

		dc.send(JSON.stringify(event))
	}

	const handleFunctionCall = async (data: any, channel: RTCDataChannel) => {
		const functionName: keyof typeof clientTools = data.name
		const tool: any = clientTools[functionName]

		if (tool !== undefined) {
			console.log(`Calling local function ${data.name} with ${data.arguments}`)
			try {
				const args = JSON.parse(data.arguments)
				const result = await tool(args)

				const event = {
					type: 'conversation.item.create',
					item: {
						type: 'function_call_output',
						call_id: data.call_id,
						output: JSON.stringify(result),
					},
				}

				channel.send(JSON.stringify(event))
				channel.send(
					JSON.stringify({
						type: 'response.create',
					})
				)
			} catch (error) {
				console.error('Error executing function call:', error)
				// Podemos adicionar tratamento de erro específico aqui se necessário
			}
		}
	}

	const cleanup = () => {
		if (localMediaStream) {
			localMediaStream.getTracks().forEach(track => track.stop())
		}

		if (dataChannel) {
			dataChannel.close()
		}

		if (peerConnection.current) {
			peerConnection.current.close()
		}

		InCallManager.stop()
		setIsSessionActive(false)
		setIsConnecting(false)
		setDataChannel(null)
		peerConnection.current = null
		setLocalMediaStream(null)
		connectionAttemptRef.current = false
	}

	const startSession = async (voice: ESessionVoice) => {
		if (isConnecting || isSessionActive || connectionAttemptRef.current) {
			console.log(
				'Session already active or connecting, ignoring start request'
			)
			return
		}

		try {
			connectionAttemptRef.current = true
			setIsConnecting(true)

			const { data } = await api.post('openai/realtime/session', {
				voice,
			})

			const EPHEMERAL_KEY = data.client_secret.value
			console.log('token response', EPHEMERAL_KEY)

			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
				shouldDuckAndroid: true,
				playThroughEarpieceAndroid: false,
			})

			// Cleanup any existing connection before starting a new one
			cleanup()

			InCallManager.start({ media: 'audio' })
			InCallManager.setMicrophoneMute(false)
			InCallManager.setSpeakerphoneOn(true)
			InCallManager.setForceSpeakerphoneOn(true)

			const pc = new RTCPeerConnection()

			pc.addEventListener('connectionstatechange', (e: any) => {
				console.log('Connection state changed:', pc.connectionState)
				if (
					pc.connectionState === 'disconnected' ||
					pc.connectionState === 'failed'
				) {
					cleanup()
				}
			})

			pc.addEventListener('track', (event: any) => {
				if (event.track) remoteMediaStream.current.addTrack(event.track)
			})

			const ms = await mediaDevices.getUserMedia({
				audio: true,
			})

			setLocalMediaStream(ms)
			pc.addTrack(ms.getTracks()[0])

			const dc = pc.createDataChannel('oai-events')
			setDataChannel(dc)

			const offer = await pc.createOffer({})
			await pc.setLocalDescription(offer)

			const baseUrl = 'https://api.openai.com/v1/realtime'
			const model = 'gpt-4o-mini-realtime-preview-2024-12-17'
			const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
				method: 'POST',
				body: offer.sdp,
				headers: {
					Authorization: `Bearer ${EPHEMERAL_KEY}`,
					'Content-Type': 'application/sdp',
				},
			})

			const answer = {
				type: 'answer',
				sdp: await sdpResponse.text(),
			}

			await pc.setRemoteDescription(answer)
			peerConnection.current = pc
		} catch (error) {
			console.warn('Connect error (trg-backend API): ', error)
			cleanup()
		} finally {
			setIsConnecting(false)
		}
	}

	const stopSession = () => {
		cleanup()
	}

	const toggleMute = () => {
		InCallManager.setMicrophoneMute(!isMuted)
		setIsMuted(!isMuted)
	}

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			cleanup()
		}
	}, [])

	useEffect(() => {
		if (dataChannel) {
			const handleMessage = async (e: any) => {
				const data = JSON.parse(e.data)
				setEvents(prev => [data, ...prev])

				if (data.type === 'response.audio_transcript.done') {
					setTranscript(data.transcript)
				}

				if (data.type === 'response.function_call_arguments.done') {
					await handleFunctionCall(data, dataChannel)
				}
			}

			const handleOpen = () => {
				setIsSessionActive(true)
				setEvents([])
				configureTools(dataChannel)
			}

			dataChannel.addEventListener('message', handleMessage)
			dataChannel.addEventListener('open', handleOpen)
			dataChannel.addEventListener('close', cleanup)

			return () => {
				dataChannel.removeEventListener('message', handleMessage)
				dataChannel.removeEventListener('open', handleOpen)
				dataChannel.removeEventListener('close', cleanup)
			}
		}
	}, [dataChannel])

	return {
		isSessionActive,
		isConnecting,
		transcript,
		events,
		remoteMediaStream: remoteMediaStream.current,
		startSession,
		stopSession,
		toggleMute,
		isMuted,
	}
}
