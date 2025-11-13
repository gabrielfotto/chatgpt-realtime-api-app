// import 'expo-dev-client'

import RFAppLogo from '@/components/RFAppLogo'
import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Button, IconButton, Tooltip, useTheme } from 'react-native-paper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import RFEndSessionBottomSheet from './components/RFEndSessionBottomSheet'
import RFVoiceSessionAnimatedCircle, {
	IRFVoiceSessionAnimatedCircleHandle,
} from './components/RFVoiceSessionAnimatedCircle'

import { useSession } from '@/stores/session'
import theme from '@/theme'
import RFVoiceSessionConnectionAnimation from './components/RFVoiceSessionConnectionAnimation'
import { useRealtimeSession } from './hooks'

const VoiceSessionScreen = () => {
	const { t } = useTranslation('session')
	const { voice } = useSession()
	const theme = useTheme()

	const insets = useSafeAreaInsets()
	const sessionCircleRef = useRef<IRFVoiceSessionAnimatedCircleHandle>(null)

	const {
		isSessionActive,
		isConnecting,
		startSession,
		stopSession,
		events,
		toggleMute,
		isMuted,
	} = useRealtimeSession()

	const [isAgentSpeaking, setIsAgentSpeaking] = useState(false)
	const [isUserSpeaking, setIsUserSpeaking] = useState(false)
	const [isEndSessionVisible, setIsEndSessionVisible] = useState(false)

	const handleStopSession = () => {
		stopSession()
		setIsEndSessionVisible(false)
		router.push('/home')
	}

	// Iniciar sessão apenas uma vez na montagem do componente
	useEffect(() => {
		let mounted = true

		const initSession = async () => {
			if (mounted) {
				await startSession(voice)
			}
		}

		initSession()

		return () => {
			mounted = false
			stopSession()
		}
	}, [])

	useEffect(() => {
		const lastEvent = events[0]
		if (!lastEvent || !sessionCircleRef.current) {
			return
		}

		if (lastEvent.type === 'output_audio_buffer.started') {
			setIsAgentSpeaking(true)
			setIsUserSpeaking(false)
		} else if (
			lastEvent.type === 'output_audio_buffer.stopped' ||
			lastEvent.type === 'output_audio_buffer.cleared'
		) {
			setIsAgentSpeaking(false)
		}

		if (lastEvent.type === 'input_audio_buffer.speech_started') {
			setIsUserSpeaking(true)
			setIsAgentSpeaking(false)
		} else if (lastEvent.type === 'input_audio_buffer.speech_stopped') {
			setIsUserSpeaking(false)
		}

		// Apenas inicia a animação se ela ainda não estiver rodando
		if (
			lastEvent.type === 'input_audio_buffer.speech_started' ||
			lastEvent.type === 'output_audio_buffer.started'
		) {
			sessionCircleRef.current.startPulseAnimation()
		}
	}, [events])

	const getMicButtonTooltip = () => {
		if (isConnecting || !isSessionActive) {
			return t('s.voice.mic.disabled.connecting')
		}
		return isMuted ? t('s.voice.mic.unmute') : t('s.voice.mic.mute')
	}

	return (
		<SafeAreaView style={styles.container}>
			<RFAppLogo />

			<View style={styles.mainContent}>
				<View style={styles.sessionContainer}>
					<View style={styles.circleContainer}>
						{isConnecting || !isSessionActive ? (
							<RFVoiceSessionConnectionAnimation />
						) : (
							<RFVoiceSessionAnimatedCircle
								ref={sessionCircleRef}
								isAgentSpeaking={isAgentSpeaking}
								isAnySpeaking={isAgentSpeaking || isUserSpeaking}
							/>
						)}
					</View>

					{!isConnecting && isSessionActive && (
						<View style={styles.micButtonContainer}>
							<Text style={styles.micText}>
								{isMuted
									? t('s.voice.mic.clickToSpeak')
									: t('s.voice.mic.clickToMute')}
							</Text>
							<IconButton
								icon="chevron-down"
								size={16}
								style={styles.chevronIcon}
								iconColor={theme.colors.primary}
							/>
							<Tooltip title={getMicButtonTooltip()}>
								<IconButton
									icon={isMuted ? 'microphone-off' : 'microphone'}
									mode="contained-tonal"
									size={32}
									onPress={toggleMute}
									style={[
										styles.micButton,
										{
											opacity: isConnecting || !isSessionActive ? 0.5 : 1,
											backgroundColor: isMuted ? '#D32F2F' : '#2fbf76',
										},
									]}
									iconColor="#fff"
									disabled={isConnecting || !isSessionActive}
								/>
							</Tooltip>
						</View>
					)}
				</View>
			</View>

			<View
				style={[
					styles.footerContent,
					{ marginBottom: Math.max(16, insets.bottom) },
				]}
			>
				<Button
					mode="outlined"
					onPress={() => setIsEndSessionVisible(true)}
					style={[
						styles.footerButton,
						{ opacity: isConnecting || !isSessionActive ? 0.5 : 1 },
					]}
				>
					{t('s.voice.endSession')}
				</Button>
			</View>

			<RFEndSessionBottomSheet
				isActive={isEndSessionVisible}
				onClose={() => setIsEndSessionVisible(false)}
				onConfirm={handleStopSession}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mainContent: {
		flex: 1,
		justifyContent: 'center',
	},
	sessionContainer: {
		height: 400, // Altura fixa para manter consistência
		alignItems: 'center',
		justifyContent: 'center',
	},
	circleContainer: {
		height: 240, // Altura do círculo maior
		alignItems: 'center',
		justifyContent: 'center',
	},
	micButtonContainer: {
		marginTop: 38, // Espaço específico após o círculo
		alignItems: 'center',
	},
	micText: {
		fontSize: 14,
		color: theme.colors.primary,
		marginBottom: 4,
	},
	chevronIcon: {
		margin: 0,
		marginBottom: 4,
	},
	footerContent: {
		paddingHorizontal: 60,
		paddingVertical: 16,
		zIndex: 2,
	},
	footerButton: {
		borderRadius: 100,
	},
	micButton: {
		borderRadius: 100,
	},
})

export default VoiceSessionScreen
