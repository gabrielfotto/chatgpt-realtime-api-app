import RFAppLogo from '@/components/RFAppLogo'
import theme from '@/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const OnboardingStep06 = () => {
	const { t } = useTranslation('onboarding')
	const insets = useSafeAreaInsets()

	const handleSkipVideo = () => {
		// TODO: Navigate to the next step
		router.push('/onboarding/step-07')
	}

	return (
		<View style={styles.container}>
			<SafeAreaView edges={['top']} style={styles.content}>
				<View>
					<RFAppLogo />

					<Text variant="headlineMedium" style={styles.title}>
						{t('s.step06.title')}
					</Text>
				</View>

				<View style={styles.videoSection}>
					<LinearGradient
						colors={['#FFFFFF', '#FFFFFF', 'rgba(255, 255, 255, 0)']}
						locations={[0, 0.2, 1]}
						style={styles.contentGradient}
					/>
					<View style={styles.videoContainer}>
						{/* <Video
							source={require('@/assets/video-tmp.mp4')}
							style={styles.video}
							resizeMode={ResizeMode.COVER}
							isLooping
							shouldPlay
							isMuted={false}
						/> */}
					</View>
				</View>
			</SafeAreaView>

			<SafeAreaView edges={['bottom']} style={styles.footer}>
				<LinearGradient
					colors={['rgba(255, 255, 255, 0)', '#FFFFFF', '#FFFFFF']}
					locations={[0, 0.5, 1]}
					style={styles.footerGradient}
				/>

				<View
					style={[
						styles.footerContent,
						{ marginBottom: Math.max(16, insets.bottom) },
					]}
				>
					<Button mode="outlined" onPress={handleSkipVideo}>
						{t('s.step06.button.skip')}
					</Button>
				</View>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: -30, // Compensa o padding do layout
	},
	content: {
		flex: 1,
	},
	title: {
		color: theme.colors.primary,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 24,
	},
	videoSection: {
		flex: 1,
		position: 'relative',
	},
	contentGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 50,
		zIndex: 1,
	},
	videoContainer: {
		flex: 1,
	},
	video: {
		width: '100%',
		height: '100%',
	},
	footer: {
		backgroundColor: 'transparent',
		width: '100%',
	},
	footerGradient: {
		position: 'absolute',
		top: -200,
		left: -60,
		right: -60,
		bottom: 0,
		zIndex: -1,
	},
	footerContent: {
		paddingHorizontal: 60,
		paddingVertical: 16,
		zIndex: 2,
	},
})

export default OnboardingStep06
