import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RFAppLogo from '@/components/RFAppLogo'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { ThemedText } from '@/components/ThemedText'
import { Palette } from '@/constants/colors'

const OnboardingStep01 = () => {
	const handleStart = () => {
		router.push('/onboarding/step-02')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.logoContainer}>
					<RFAppLogo width={140} height={140} />
				</View>

				<View style={styles.textContainer}>
					<ThemedText type="mystical" style={styles.title}>
						Seu dia explicado pela astrologia
					</ThemedText>
					<ThemedText type="body1" style={styles.subtitle}>
						Como você nunca viu antes.
					</ThemedText>
				</View>

				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={handleStart}>Começar</PrimaryButton>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Palette.primary,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
	},
	logoContainer: {
		marginBottom: 48,
	},
	textContainer: {
		alignItems: 'center',
		marginBottom: 64,
	},
	title: {
		textAlign: 'center',
		color: Palette.textPrimary,
		marginBottom: 16,
	},
	subtitle: {
		textAlign: 'center',
		color: Palette.textSecondary,
	},
	buttonContainer: {
		width: '100%',
	},
})

export default OnboardingStep01
