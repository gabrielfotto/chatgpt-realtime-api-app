import RFBottomSheet from '@/components/RFBottomSheet'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import {
	Button,
	HelperText,
	Text,
	TextInput,
	useTheme,
} from 'react-native-paper'
import * as yup from 'yup'

interface IRFEditPhoneBottomSheetProps {
	isActive: boolean
	onClose: () => void
	value?: string
	onChange?: (phone: string) => void
}

const RFEditPhoneBottomSheet = ({
	isActive,
	onClose,
	onChange,
	value,
}: IRFEditPhoneBottomSheetProps) => {
	const { t } = useTranslation('onboarding')
	const theme = useTheme()

	const schema = yup.object({
		phone: yup.string().required(t('common:validation.required.phone')),
	})

	type TFormData = yup.InferType<typeof schema>

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			phone: value || '',
		},
	})

	const handleSubmitData = (data: TFormData) => {
		onChange?.(data.phone)
		onClose()
	}

	return (
		<RFBottomSheet isActive={isActive} onClose={onClose} snapPoints={['70%']}>
			<Text variant="titleMedium" style={styles.bottomSheetTitle}>
				{t('c.edit_phone_bottom_sheet.title')}
			</Text>
			<Controller
				control={control}
				name="phone"
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<TextInput
							dense
							mode="outlined"
							right={
								<TextInput.Icon icon="pencil" color={theme.colors.primary} />
							}
							placeholder={t('c.edit_phone_bottom_sheet.placeholder')}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={!!errors.phone}
						/>
						<HelperText type="error" visible={!!errors.phone}>
							{t(errors.phone?.message || '')}
						</HelperText>
					</>
				)}
			/>

			<Button
				mode="contained"
				onPress={handleSubmit(handleSubmitData)}
				buttonColor={theme.colors.primary}
				style={{ marginTop: 8 }}
			>
				{t('c.edit_phone_bottom_sheet.button.continue')}
			</Button>
		</RFBottomSheet>
	)
}

const styles = StyleSheet.create({
	bottomSheetTitle: {
		marginBottom: 24,
	},
})

export default RFEditPhoneBottomSheet
