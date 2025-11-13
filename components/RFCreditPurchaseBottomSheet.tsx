import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import RFBottomSheet from './RFBottomSheet'
import RFCreditPackageButton from './RFCreditPackageButton'

interface IRFCreditPurchaseBottomSheetProps {
	isActive: boolean
	onClose: () => void
	userName?: string
}

const creditPackages = [
	{
		sessions: 1,
		price: 15,
		savings: 0,
	},
	{
		sessions: 5,
		price: 45,
		savings: 5,
	},
	{
		sessions: 10,
		price: 90,
		savings: 10,
	},
	{
		sessions: 20,
		price: 180,
		savings: 20,
	},
]

const RFCreditPurchaseBottomSheet: React.FC<
	IRFCreditPurchaseBottomSheetProps
> = ({ isActive, onClose, userName = 'Antonio' }) => {
	const { t } = useTranslation()

	const handlePackageSelect = (sessions: number) => {
		// TODO: Implement purchase logic
		console.log(`Selected package with ${sessions} sessions`)
	}

	return (
		<RFBottomSheet isActive={isActive} onClose={onClose}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text variant="titleMedium" style={styles.title}>
						{t('c.credit_purchase_bottom_sheet.title', { name: userName })}
					</Text>
					<Text variant="titleMedium" style={styles.subtitle}>
						{t('c.credit_purchase_bottom_sheet.subtitle')}
					</Text>
					<Text variant="bodyMedium" style={styles.description}>
						{t('c.credit_purchase_bottom_sheet.description')}
					</Text>
				</View>

				<View style={styles.packagesContainer}>
					{creditPackages.map(pkg => (
						<RFCreditPackageButton
							key={pkg.sessions}
							sessions={pkg.sessions}
							price={pkg.price}
							savings={pkg.savings}
							onPress={() => handlePackageSelect(pkg.sessions)}
						/>
					))}
				</View>
			</View>
		</RFBottomSheet>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		marginBottom: 24,
	},
	title: {
		fontSize: 16,
		lineHeight: 24,
	},
	subtitle: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 4,
	},
	description: {
		color: '#666666',
	},
	packagesContainer: {
		gap: 12,
	},
})

export default RFCreditPurchaseBottomSheet
