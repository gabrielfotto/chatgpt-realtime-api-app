import RFAppLogo from '@/components/RFAppLogo'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'
import {
	Button,
	HelperText,
	Text,
	TextInput,
	useTheme,
} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as yup from 'yup'

const OnboardingStep02 = () => {
	const { t } = useTranslation('onboarding')
	const theme = useTheme()

	// const schema = yup.object({
	// 	name: yup.string().required(t('s.step02.fields.name.error')),
	// 	email: yup
	// 		.string()
	// 		.email(t('s.step02.fields.email.invalid'))
	// 		.required(t('s.step02.fields.email.error')),
	// 	phone: yup.string().required(t('s.step02.fields.phone.error')),
	// })

	const schema = yup.object({
		name: yup.string().optional(),
		email: yup.string().optional(),
		phone: yup.string().optional(),
	})

	type TFormData = yup.InferType<typeof schema>

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
		},
	})

	function handleSubmitData(data: TFormData) {
		console.log(data)
		router.push('/onboarding/step-03')
	}

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
							{t('s.step02.title')}
						</Text>
						<Text variant="bodyLarge" style={{ marginTop: 5 }}>
							{t('s.step02.subtitle')}
						</Text>
						<View style={{ marginTop: 36 }}>
							<Controller
								control={control}
								name="name"
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<TextInput
											dense
											mode="outlined"
											placeholder={t('s.step02.fields.name.placeholder')}
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											error={!!errors.name}
											autoCapitalize="words"
										/>
										<HelperText type="error" visible={!!errors.name}>
											{t(errors.name?.message || '')}
										</HelperText>
									</>
								)}
							/>

							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<TextInput
											dense
											mode="outlined"
											placeholder={t('s.step02.fields.email.placeholder')}
											keyboardType="email-address"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											error={!!errors.email}
											autoCapitalize="none"
										/>
										<HelperText type="error" visible={!!errors.email}>
											{t(errors.email?.message || '')}
										</HelperText>
									</>
								)}
							/>

							<Controller
								control={control}
								name="phone"
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<TextInput
											dense
											mode="outlined"
											placeholder={t('s.step02.fields.phone.placeholder')}
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											error={!!errors.phone}
											keyboardType="phone-pad"
										/>
										<HelperText type="error" visible={!!errors.phone}>
											{t(errors.phone?.message || '')}
										</HelperText>
									</>
								)}
							/>

							<Button
								mode="contained"
								buttonColor={theme.colors.primary}
								style={{ marginTop: 8 }}
								onPress={handleSubmit(handleSubmitData)}
							>
								{t('s.step02.button.continue')}
							</Button>

							<Button
								mode="outlined"
								style={{ marginTop: 16 }}
								onPress={() => router.back()}
							>
								{t('s.step02.button.back')}
							</Button>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
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
})

export default OnboardingStep02
