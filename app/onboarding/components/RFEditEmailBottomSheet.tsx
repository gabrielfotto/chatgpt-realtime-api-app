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

interface IRFEditEmailBottomSheetProps {
	isActive: boolean
	onClose: () => void
	value?: string
	onChange?: (email: string) => void
}

const RFEditEmailBottomSheet = ({
	isActive,
	onClose,
	onChange,
	value,
}: IRFEditEmailBottomSheetProps) => {
	const { t } = useTranslation('onboarding')
	const theme = useTheme()

	const schema = yup.object({
		email: yup
			.string()
			.email(t('common:validation.invalid.email'))
			.required(t('common:validation.required.email')),
	})

	type TFormData = yup.InferType<typeof schema>

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: value || '',
		},
	})

	const handleSubmitData = (data: TFormData) => {
		onChange?.(data.email)
		onClose()
	}

	return (
		<RFBottomSheet isActive={isActive} onClose={onClose} snapPoints={['70%']}>
			<Text variant="titleMedium" style={styles.bottomSheetTitle}>
				{t('c.edit_email_bottom_sheet.title')}
			</Text>
			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<TextInput
							dense
							mode="outlined"
							right={
								<TextInput.Icon icon="pencil" color={theme.colors.primary} />
							}
							placeholder={t('c.edit_email_bottom_sheet.placeholder')}
							keyboardType="email-address"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={!!errors.email}
						/>
						<HelperText type="error" visible={!!errors.email}>
							{t(errors.email?.message || '')}
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
				{t('c.edit_email_bottom_sheet.button.continue')}
			</Button>
		</RFBottomSheet>
	)
}

const styles = StyleSheet.create({
	bottomSheetTitle: {
		marginBottom: 24,
	},
})

export default RFEditEmailBottomSheet
