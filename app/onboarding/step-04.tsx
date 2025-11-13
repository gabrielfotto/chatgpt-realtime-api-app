import RFConfirmationInfoBottomSheet from '@/app/onboarding/components/RFConfirmationInfoBottomSheet'
import RFEditPhoneBottomSheet from '@/app/onboarding/components/RFEditPhoneBottomSheet'
import RFAppLogo from '@/components/RFAppLogo'
import RFCodeInput from '@/components/RFCodeInput'
import theme from '@/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as yup from 'yup'

const MIN_CODE_LENGTH = 6
const MAX_CODE_LENGTH = 6

const OnboardingStep04 = () => {
	const { t } = useTranslation('onboarding')

	// const schema = yup.object({
	// 	code: yup
	// 		.string()
	// 		.required(t('common:validation.required.code'))
	// 		.min(
	// 			MIN_CODE_LENGTH,
	// 			t('common:validation.length.code', { length: MIN_CODE_LENGTH })
	// 		)
	// 		.max(
	// 			MAX_CODE_LENGTH,
	// 			t('common:validation.length.code', { length: MAX_CODE_LENGTH })
	// 		),
	// })

	const schema = yup.object({
		code: yup.string().optional(),
	})

	type TFormData = yup.InferType<typeof schema>

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			code: '',
		},
	})

	const handleSubmitData = useCallback((data: TFormData) => {
		console.log(data)
		router.push('/onboarding/step-05')
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.keyboardAvoidingView}
			>
				<ScrollView
					contentContainerStyle={styles.scrollViewContent}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<RFAppLogo />

					<View style={styles.content}>
						<Text
							variant="titleLarge"
							style={{ fontWeight: 'bold', color: theme.colors.primary }}
						>
							{t('s.step04.title')}
						</Text>
						<Text variant="bodyLarge" style={{ marginTop: 5 }}>
							{t('s.step04.subtitle')}
						</Text>
						<View style={styles.sentToContainer}>
							<Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
								{'(62) 9 9326-8355'}
							</Text>
							<Text> – </Text>
							<EditPhoneButton />
						</View>
						<View style={{ marginTop: 36 }}>
							<Controller
								control={control}
								name="code"
								render={({ field: { onChange, value } }) => (
									<RFCodeInput
										value={value}
										onChange={onChange}
										error={errors.code?.message}
									/>
								)}
							/>

							<View style={styles.phoneContainer}>
								<Text variant="bodyMedium">
									{t('s.step04.phone.resend.text')}
								</Text>
								<Text> – </Text>
								<Pressable onPress={() => {}}>
									<Text style={styles.resendPhoneLink}>
										{t('s.step04.phone.resend.link')}
									</Text>
								</Pressable>
							</View>

							<Button
								mode="contained"
								onPress={handleSubmit(handleSubmitData)}
								buttonColor={theme.colors.primary}
								style={{ marginTop: 8 }}
							>
								{t('s.step04.button.confirm')}
							</Button>

							<Button
								mode="outlined"
								style={{ marginTop: 16 }}
								onPress={() => router.back()}
							>
								{t('s.step04.button.back')}
							</Button>

							<RFConfirmationInfoBottomSheet />
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const EditPhoneButton = () => {
	const { t } = useTranslation('onboarding')
	const theme = useTheme()
	const [isBottomSheetActive, setIsBottomSheetActive] = useState(false)

	return (
		<View>
			<Pressable onPress={() => setIsBottomSheetActive(true)}>
				<View style={styles.editPhoneContainer}>
					<Text variant="bodyLarge">{t('s.step04.phone.edit')}</Text>
					<MaterialCommunityIcons
						name="pencil"
						size={20}
						color={theme.colors.primary}
					/>
				</View>
			</Pressable>

			<RFEditPhoneBottomSheet
				isActive={isBottomSheetActive}
				onClose={() => setIsBottomSheetActive(false)}
				onChange={phone => {
					console.log('Telefone alterado:', phone)
					setIsBottomSheetActive(false)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	scrollViewContent: {
		flexGrow: 1,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		paddingBottom: 24,
	},
	sentToContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
	},
	phoneContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
	},
	resendPhoneLink: {
		color: 'black',
		textDecorationLine: 'underline',
		fontWeight: 'bold',
	},
	editPhoneContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
})

export default OnboardingStep04
