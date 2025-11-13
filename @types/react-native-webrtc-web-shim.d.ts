declare module 'react-native-webrtc-web-shim' {
	import { Component } from 'react'
	import { ViewProps } from 'react-native'

	export interface MediaStreamTrack {
		enabled: boolean
		id: string
		kind: string
		label: string
		muted: boolean
		readyState: string
		remote: boolean
	}

	export class MediaStream {
		id: string
		active: boolean

		constructor()
		addTrack(track: MediaStreamTrack): void
		removeTrack(track: MediaStreamTrack): void
		getTracks(): MediaStreamTrack[]
		getVideoTracks(): MediaStreamTrack[]
		getAudioTracks(): MediaStreamTrack[]
		clone(): MediaStream
	}

	export interface RTCPeerConnection {
		addEventListener(event: string, callback: (event: any) => void): void
		removeEventListener(event: string, callback: (event: any) => void): void
		createDataChannel(label: string, options?: any): RTCDataChannel
		createOffer(options?: any): Promise<RTCSessionDescription>
		setLocalDescription(description: RTCSessionDescription): Promise<void>
		setRemoteDescription(description: any): Promise<void>
		close(): void
		addTrack(track: MediaStreamTrack): void
	}

	export interface RTCDataChannel {
		send(data: string): void
		close(): void
		addEventListener(event: string, callback: (event: any) => void): void
		removeEventListener(event: string, callback: (event: any) => void): void
	}

	export interface RTCSessionDescription {
		type: string
		sdp: string
	}

	export const mediaDevices: {
		getUserMedia(constraints: {
			audio?: boolean
			video?: boolean
		}): Promise<MediaStream>
	}

	export interface RTCViewProps extends ViewProps {
		stream?: MediaStream | null
		mirror?: boolean
		objectFit?: 'contain' | 'cover'
		zOrder?: number
	}

	export class RTCView extends Component<RTCViewProps> {}
}
