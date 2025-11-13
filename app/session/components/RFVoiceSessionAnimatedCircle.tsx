import { LinearGradient } from 'expo-linear-gradient'
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

interface IRFVoiceSessionAnimatedCircleProps {
	isAgentSpeaking: boolean
	isAnySpeaking?: boolean
}

export interface IRFVoiceSessionAnimatedCircleHandle {
	startPulseAnimation: () => void
	stopPulseAnimation: () => void
}

const RFVoiceSessionAnimatedCircle = forwardRef<
	IRFVoiceSessionAnimatedCircleHandle,
	IRFVoiceSessionAnimatedCircleProps
>(({ isAgentSpeaking, isAnySpeaking = false }, ref) => {
	const { t } = useTranslation('session')
	const theme = useTheme()

	const pulseAnim = useRef(new Animated.Value(1)).current
	const fadeAnim = useRef(new Animated.Value(1)).current
	const colorTransition = useRef(new Animated.Value(0)).current
	const pulseAnimationRef = useRef<Animated.CompositeAnimation | null>(null)
	const isAnimating = useRef(false)

	useEffect(() => {
		startPulseAnimation()
		return () => {
			if (pulseAnimationRef.current) {
				pulseAnimationRef.current.stop()
				pulseAnimationRef.current = null
			}
		}
	}, [])

	useEffect(() => {
		Animated.timing(colorTransition, {
			toValue: isAgentSpeaking ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start()
	}, [isAgentSpeaking, colorTransition])

	const startPulseAnimation = () => {
		// Se já estiver animando, não faz nada
		if (isAnimating.current) return
		isAnimating.current = true

		pulseAnimationRef.current = Animated.loop(
			Animated.sequence([
				Animated.timing(pulseAnim, {
					toValue: 1.1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(pulseAnim, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
			])
		)

		pulseAnimationRef.current.start()
	}

	const stopPulseAnimation = () => {
		if (pulseAnimationRef.current) {
			pulseAnimationRef.current.stop()
			pulseAnimationRef.current = null
		}
		isAnimating.current = false
		pulseAnim.setValue(1)
	}

	useImperativeHandle(ref, () => ({
		startPulseAnimation,
		stopPulseAnimation,
	}))

	const gradientStart = colorTransition.interpolate({
		inputRange: [0, 1],
		outputRange: ['#fcfcfc', theme.colors.primary],
	})

	const gradientEnd = colorTransition.interpolate({
		inputRange: [0, 1],
		outputRange: ['#dddddd', '#165d93'],
	})

	const textColor = colorTransition.interpolate({
		inputRange: [0, 1],
		outputRange: [theme.colors.primary, '#ffffff'],
	})

	const getCircleOpacity = (baseOpacity: number) => {
		return Animated.multiply(
			fadeAnim,
			pulseAnim.interpolate({
				inputRange: [1, 1.1],
				outputRange: [baseOpacity, baseOpacity * 1.5],
			})
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.centerContainer}>
				<View style={styles.circlesWrapper}>
					<Animated.View
						style={[
							styles.circle,
							styles.circleOuter,
							{
								transform: [{ scale: pulseAnim }],
								opacity: getCircleOpacity(isAnySpeaking ? 0.25 : 0.08),
								backgroundColor: isAnySpeaking
									? 'rgba(0, 86, 205, 0.25)'
									: 'rgba(0, 86, 205, 0.08)',
							},
						]}
					/>
					<Animated.View
						style={[
							styles.circle,
							styles.circleMidOuter,
							{
								transform: [{ scale: pulseAnim }],
								opacity: getCircleOpacity(isAnySpeaking ? 0.3 : 0.12),
								backgroundColor: isAnySpeaking
									? 'rgba(0, 86, 205, 0.3)'
									: 'rgba(0, 86, 205, 0.12)',
							},
						]}
					/>
					<Animated.View
						style={[
							styles.circle,
							styles.circleMid,
							{
								transform: [{ scale: pulseAnim }],
								opacity: getCircleOpacity(isAnySpeaking ? 0.35 : 0.16),
								backgroundColor: isAnySpeaking
									? 'rgba(0, 86, 205, 0.35)'
									: 'rgba(0, 86, 205, 0.16)',
							},
						]}
					/>
					<View style={[styles.circle, styles.circleInner]}>
						<AnimatedGradient
							colors={[gradientStart, gradientEnd]}
							style={styles.gradientCircle}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
						>
							<Animated.Text style={[styles.circleText, { color: textColor }]}>
								{isAgentSpeaking
									? t('c.voice_session_animated_circle.speakToInterrupt')
									: t('c.voice_session_animated_circle.listening')}
							</Animated.Text>
						</AnimatedGradient>
					</View>
				</View>
			</View>
		</View>
	)
})

// Create an animated version of LinearGradient
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

RFVoiceSessionAnimatedCircle.displayName = 'RFVoiceSessionAnimatedCircle'

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	centerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circlesWrapper: {
		width: 260,
		height: 260,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	circle: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 9999,
	},
	circleOuter: {
		width: 260,
		height: 260,
		backgroundColor: 'rgba(0, 86, 205, 0.08)',
	},
	circleMidOuter: {
		width: 220,
		height: 220,
		backgroundColor: 'rgba(0, 86, 205, 0.12)',
	},
	circleMid: {
		width: 180,
		height: 180,
		backgroundColor: 'rgba(0, 86, 205, 0.16)',
	},
	circleInner: {
		width: 150,
		height: 150,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.4,
		shadowRadius: 3.5,
		elevation: 3,
		backgroundColor: 'transparent',
		borderRadius: 9999,
		overflow: 'hidden',
		paddingHorizontal: 8,
	},
	gradientCircle: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 9999,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circleText: {
		color: '#fff',
		fontSize: 14,
		lineHeight: 20,
		textAlign: 'center',
		fontWeight: '500',
	},
})

export default RFVoiceSessionAnimatedCircle
