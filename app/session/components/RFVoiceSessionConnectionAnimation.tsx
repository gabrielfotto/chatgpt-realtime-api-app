import theme from '@/theme'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, StyleSheet, Text, View } from 'react-native'

const RFVoiceSessionConnectionAnimation = () => {
	const mainAnimation = React.useRef(new Animated.Value(0)).current
	const { t } = useTranslation('session')

	useEffect(() => {
		const animate = () => {
			Animated.loop(
				Animated.timing(mainAnimation, {
					toValue: 4,
					duration: 4000,
					useNativeDriver: true,
				})
			).start()
		}

		animate()
	}, [])

	const getAnimationStyle = (index: number) => {
		const startTime = index
		const duration = 2

		return {
			transform: [
				{
					scale: mainAnimation.interpolate({
						inputRange: [startTime, startTime + duration],
						outputRange: [1, 2],
						extrapolate: 'clamp',
					}),
				},
			],
			opacity: mainAnimation.interpolate({
				inputRange: [
					startTime,
					startTime + 0.2,
					startTime + duration - 0.2,
					startTime + duration,
				],
				outputRange: [0, 0.8, 0.8, 0],
				extrapolate: 'clamp',
			}),
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.circlesWrapper}>
				{[0, 1, 2].map(index => (
					<Animated.View
						key={index}
						style={[styles.circle, getAnimationStyle(index)]}
					/>
				))}
				<Text style={styles.connectingText}>
					{t('c.voice_session_connection_animation.title')}
				</Text>
			</View>
			<View style={styles.micSpacer} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 250,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circlesWrapper: {
		width: 210,
		height: 210,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	circle: {
		width: 130,
		height: 130,
		borderRadius: 130,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		position: 'absolute',
	},
	connectingText: {
		color: theme.colors.primary,
		fontSize: 14,
		lineHeight: 20,
		textAlign: 'center',
	},
	micSpacer: {
		marginTop: 38,
		height: 116,
	},
})

export default RFVoiceSessionConnectionAnimation
