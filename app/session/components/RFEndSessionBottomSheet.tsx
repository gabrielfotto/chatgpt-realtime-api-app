import RFBottomSheet from '@/components/RFBottomSheet'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

interface IRFEndSessionBottomSheetProps {
	isActive: boolean
	onClose: () => void
	onConfirm: () => void
}

const RFEndSessionBottomSheet = ({
	isActive,
	onClose,
	onConfirm,
}: IRFEndSessionBottomSheetProps) => {
	const { t } = useTranslation('session')

	return (
		<RFBottomSheet isActive={isActive} onClose={onClose} snapPoints={['25%']}>
			<View style={styles.container}>
				<View style={styles.buttonsContainer}>
					<Button
						mode="text"
						style={styles.button}
						labelStyle={{ color: '#666666', fontSize: 16 }}
						onPress={onConfirm}
					>
						{t('c.end_session_bottom_sheet.title')}
					</Button>
					<Button
						mode="text"
						style={styles.button}
						labelStyle={{ color: '#000', fontSize: 18 }}
						onPress={onClose}
					>
						{t('c.end_session_bottom_sheet.continue')}
					</Button>
				</View>
			</View>
		</RFBottomSheet>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		textAlign: 'center',
		marginBottom: 24,
	},
	buttonsContainer: {
		gap: 12,
	},
	button: {
		borderRadius: 100,
	},
})

export default RFEndSessionBottomSheet
