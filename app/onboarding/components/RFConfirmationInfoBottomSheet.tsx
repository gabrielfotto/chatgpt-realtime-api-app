import RFBottomSheet from '@/components/RFBottomSheet'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'
import { Divider, Text, useTheme } from 'react-native-paper'

const RFConfirmationInfoText = () => {
	const { t } = useTranslation('onboarding')
	const theme = useTheme()

	const [isBottomSheetActive, setIsBottomSheetActive] = useState(false)

	return (
		<View>
			<Pressable onPress={() => setIsBottomSheetActive(true)}>
				<View style={styles.helpContainer}>
					<Text variant="bodyMedium" style={styles.helpText}>
						{t('c.confirmation_info_bottom_sheet.help_text')}
					</Text>
					<MaterialCommunityIcons
						name="information"
						size={20}
						color={theme.colors.primary}
					/>
				</View>
			</Pressable>

			<RFBottomSheet
				isActive={isBottomSheetActive}
				onClose={() => setIsBottomSheetActive(false)}
				snapPoints={['70%']}
			>
				<Text variant="titleMedium">
					{t('c.confirmation_info_bottom_sheet.title')}
				</Text>
				<Text variant="bodyMedium" style={{ marginTop: 16 }}>
					{t('c.confirmation_info_bottom_sheet.description.security')}
				</Text>
				<Text variant="bodyMedium" style={{ marginTop: 16 }}>
					{t('c.confirmation_info_bottom_sheet.description.usage')}
				</Text>
				<Text variant="bodyMedium" style={{ marginTop: 16 }}>
					{t('c.confirmation_info_bottom_sheet.description.privacy')}
				</Text>
				<Divider style={{ marginVertical: 24 }} />
				<Pressable onPress={() => {}}>
					<View style={[styles.helpContainer, { alignSelf: 'center' }]}>
						<Text variant="bodyMedium" style={styles.helpText}>
							{t('c.confirmation_info_bottom_sheet.privacy_policy')}
						</Text>
						<MaterialCommunityIcons
							name="information"
							size={20}
							color={theme.colors.primary}
						/>
					</View>
				</Pressable>
			</RFBottomSheet>
		</View>
	)
}

const styles = StyleSheet.create({
	helpContainer: {
		marginTop: 24,
		flexDirection: 'row',
		alignItems: 'center',
	},
	helpText: {
		fontStyle: 'italic',
		marginRight: 6,
	},
})

export default RFConfirmationInfoText
