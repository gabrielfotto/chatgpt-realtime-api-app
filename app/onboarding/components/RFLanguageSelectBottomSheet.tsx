import RFBottomSheet from '@/components/RFBottomSheet'
import { LANGUAGES } from '@/constants/languages'
import { ILanguage } from '@/interfaces/language'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import FlagIcon from 'react-native-ico-flags'
import { List, Text, useTheme } from 'react-native-paper'

interface IRFLanguageSelectBottomSheetProps {
	isActive: boolean
	onClose: () => void
	value?: ILanguage
	onChange?: (language: ILanguage) => void
}

const RFLanguageSelectBottomSheet = ({
	isActive,
	onClose,
	value,
	onChange,
}: IRFLanguageSelectBottomSheetProps) => {
	const { t } = useTranslation('onboarding')
	const theme = useTheme()

	const handleSelectLanguage = (language: ILanguage) => {
		onChange?.(language)
		onClose()
	}

	return (
		<RFBottomSheet isActive={isActive} onClose={onClose} snapPoints={['70%']}>
			<Text variant="titleMedium" style={styles.bottomSheetTitle}>
				{t('c.language_select_bottom_sheet.title')}
			</Text>

			<View style={styles.bottomSheetLanguageList}>
				{LANGUAGES.map(language => (
					<List.Item
						key={language.key}
						title={language.name}
						onPress={() => handleSelectLanguage(language)}
						left={props => (
							<View>
								<FlagIcon name={language.flag} width={32} height={32 * 0.75} />
							</View>
						)}
						right={props =>
							language.key === value?.key ? (
								<List.Icon
									{...props}
									icon="check"
									color={theme.colors.primary}
								/>
							) : null
						}
						style={[
							styles.bottomSheetLanguageItem,
							language.key === value?.key
								? styles.bottomSheetSelectedLanguageItem
								: styles.bottomSheetUnselectedLanguageItem,
						]}
						titleStyle={styles.bottomSheetLanguageTitle}
					/>
				))}
			</View>
		</RFBottomSheet>
	)
}

const styles = StyleSheet.create({
	bottomSheetTitle: {
		marginBottom: 24,
		textAlign: 'center',
	},
	bottomSheetLanguageList: {
		gap: 12,
	},
	bottomSheetLanguageItem: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 12,
	},
	bottomSheetSelectedLanguageItem: {
		backgroundColor: 'white',
		borderColor: '#E0E0E0',
		borderWidth: 1,
	},
	bottomSheetUnselectedLanguageItem: {
		backgroundColor: '#F5F5F5',
		borderColor: 'transparent',
		borderWidth: 1,
	},
	bottomSheetLanguageTitle: {
		fontSize: 15,
	},
})

export default RFLanguageSelectBottomSheet
