import RFAppLogo from '@/components/RFAppLogo'
import RFCreditPurchaseBottomSheet from '@/components/RFCreditPurchaseBottomSheet'
import { router } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
	const { t } = useTranslation('tab-home')
	const [
		isCreditPurchaseBottomSheetActive,
		setIsCreditPurchaseBottomSheetActive,
	] = useState(false)

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
			>
				<RFAppLogo />

				<Card style={styles.welcomeCard}>
					<Card.Content>
						<Text variant="titleLarge" style={styles.welcomeText}>
							{t('s.home.welcome.title')}
						</Text>
						<Text variant="headlineMedium" style={styles.nameText}>
							{'Antonio Dias'}
						</Text>
						<Text variant="bodyMedium" style={styles.descriptionText}>
							{t('s.home.welcome.description')}
						</Text>
						<Text variant="bodyMedium" style={styles.supportText}>
							{t('s.home.welcome.support')}
						</Text>
					</Card.Content>
				</Card>

				<Button
					mode="contained"
					style={{ marginBottom: 16 }}
					onPress={() => router.push('/session')}
				>
					{t('s.home.buttons.startSession')}
				</Button>

				<Button
					mode="outlined"
					onPress={() => setIsCreditPurchaseBottomSheetActive(true)}
				>
					{t('s.home.buttons.scheduleSession')}
				</Button>

				<RFCreditPurchaseBottomSheet
					isActive={isCreditPurchaseBottomSheetActive}
					onClose={() => setIsCreditPurchaseBottomSheetActive(false)}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 140,
	},
	welcomeCard: {
		backgroundColor: '#9E1B32',
		borderRadius: 16,
		marginBottom: 24,
		elevation: 0,
		shadowColor: 'transparent',
	},
	welcomeText: {
		color: '#fff',
		marginBottom: 4,
	},
	nameText: {
		color: '#fff',
		fontWeight: 'bold',
		marginBottom: 16,
	},
	descriptionText: {
		color: '#fff',
		marginBottom: 8,
		lineHeight: 22,
	},
	supportText: {
		color: '#fff',
		marginBottom: 24,
		lineHeight: 22,
	},
})

export default HomeScreen
