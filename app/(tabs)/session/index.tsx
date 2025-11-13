import RFAppLogo from '@/components/RFAppLogo'
import theme from '@/theme'
import { Audio } from 'expo-av'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SessionScreen = () => {
	const { t } = useTranslation('tab-session')

	const handleRequestMicrophonePermission = async () => {
		try {
			const { granted } = await Audio.getPermissionsAsync()

			if (granted) {
				router.push('/session/choose-voice')
			} else {
				const { granted } = await Audio.requestPermissionsAsync()
				if (granted) {
					router.push('/session/choose-voice')
				}
			}
		} catch (error) {
			console.error('Erro ao solicitar permissão:', error)
		}
	}

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<RFAppLogo />

			<View style={styles.content}>
				<Card style={styles.card}>
					<Card.Content style={styles.cardContent}>
						<Text variant="titleLarge" style={styles.greeting}>
							{t('s.session.welcome.greeting', { name: 'Antonio' })}
						</Text>
						<Text variant="bodyLarge" style={styles.question}>
							{t('s.session.welcome.question')}
						</Text>

						<View style={styles.imageContainer}>
							{/* <Image
								source={require('@/assets/images/session-type.jpg')}
								style={styles.sessionImage}
								resizeMode="cover"
							/> */}
						</View>

						<Button
							disabled
							mode="outlined"
							style={styles.button}
							labelStyle={styles.buttonLabel}
							onPress={() => router.push('./chat')}
						>
							{t('s.session.buttons.chat')}
						</Button>

						<Button
							mode="outlined"
							style={styles.button}
							labelStyle={styles.buttonLabel}
							onPress={handleRequestMicrophonePermission}
						>
							{t('s.session.buttons.voice')}
						</Button>
					</Card.Content>
				</Card>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	card: {
		backgroundColor: theme.colors.primary,
		borderRadius: 16,
		marginHorizontal: 0,
		elevation: 0,
		shadowColor: 'transparent',
	},
	cardContent: {
		padding: 24,
	},
	greeting: {
		color: '#fff',
		fontWeight: 'bold',
		marginBottom: 8,
	},
	question: {
		color: '#fff',
		marginBottom: 24,
	},
	imageContainer: {
		marginBottom: 24,
		borderRadius: 8,
		overflow: 'hidden',
	},
	sessionImage: {
		width: '100%',
		height: 200,
		borderRadius: 8,
	},
	button: {
		marginBottom: 16,
		borderColor: '#fff',
	},
	buttonLabel: {
		color: '#fff',
	},
})

export default SessionScreen
