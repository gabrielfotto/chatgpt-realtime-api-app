import RFAppLogo from '@/components/RFAppLogo'
import theme from '@/theme'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const OnboardingStep05 = () => {
	const { t } = useTranslation('onboarding')

	const handleRequestNotificationPermission = async () => {
		const { status } = await Notifications.requestPermissionsAsync()
		if (status === 'granted') {
		}
		router.push('/onboarding/step-06')
	}

	const handleSkip = () => {
		// router.push('/onboarding/step-06')
		router.push('/onboarding/step-04')
	}

	return (
		<SafeAreaView style={styles.container}>
			<RFAppLogo />

			<ImageBackground
				source={require('@/assets/images/allow-notifications-screen-bg.jpg')}
				style={styles.bgImageContainer}
				resizeMode="contain"
				imageStyle={styles.bgImage}
			/>

			<View style={styles.content}>
				<View style={styles.contentContainer}>
					<View style={styles.messageContainer}>
						<Text variant="headlineMedium" style={styles.messageTitle}>
							{t('s.step05.title')}
						</Text>
						<Text variant="bodyLarge" style={styles.messageDescription}>
							{t('s.step05.description')}
						</Text>
					</View>

					<View style={styles.buttonContainer}>
						<Button
							mode="contained"
							onPress={handleRequestNotificationPermission}
						>
							{t('s.step05.button.allow')}
						</Button>

						<Button mode="outlined" onPress={handleSkip}>
							{t('s.step05.button.skip')}
						</Button>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgImageContainer: {
		flex: 1,
		position: 'absolute',
		width: '100%',
		height: '100%',
		marginTop: 60,
	},
	bgImage: {
		margin: 6,
	},
	content: {
		flex: 1,
		zIndex: 1,
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingBottom: 70,
	},
	messageContainer: {
		marginBottom: 32,
	},
	messageTitle: {
		color: theme.colors.primary,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	messageDescription: {
		color: theme.colors.onSurface,
	},
	buttonContainer: {
		gap: 16,
	},
})

export default OnboardingStep05
