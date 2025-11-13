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
import * as yup from 'yup'

import RFAppLogo from '@/components/RFAppLogo'
import { SafeAreaView } from 'react-native-safe-area-context'

const MIN_PASSWORD_LENGTH = 6

type ValidationError = {
	key: string
	values?: Record<string, unknown>
}

const LoginScreen = () => {
	const { t } = useTranslation(['auth', 'common'])

	// Move schema inside component to access translations
	const schema = yup.object({
		email: yup
			.string()
			.email(t('common:validation.invalid.email'))
			.required(t('common:validation.required.email')),
		password: yup
			.string()
			.min(MIN_PASSWORD_LENGTH, ({ min }) => ({
				key: t('s.login.password.validation.min', { min }),
				values: { min },
			}))
			.required(t('s.login.password.validation.required')),
	})

	type TFormData = yup.InferType<typeof schema>

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const theme = useTheme()

	function onSubmit(data: IFormData) {
		router.push('/onboarding/step-01')
	}

	const getErrorMessage = (error: unknown) => {
		if (!error) return ''

		const message = (error as { message: unknown }).message
		if (typeof message === 'string') return t(message)
		if (typeof message === 'object' && message !== null) {
			const validationError = message as ValidationError
			if (validationError.key) {
				return t(validationError.key, validationError.values)
			}
		}
		return ''
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
							{t('s.login.title', { name: 'Antônio' })}
						</Text>
						<Text variant="bodyLarge" style={{ marginTop: 5 }}>
							{t('s.login.subtitle')}
						</Text>

						{/* {errors && (
							<Text variant="bodyLarge" style={{ marginTop: 8, color: 'red' }}>
								Email ou senha incorretos.
							</Text>
						)} */}

						<View style={{ marginTop: 36 }}>
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<TextInput
											dense
											mode="outlined"
											placeholder={t('s.login.email.placeholder')}
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											error={!!errors.email}
											keyboardType="email-address"
											autoCapitalize="none"
										/>
										<HelperText type="error" visible={!!errors.email}>
											{getErrorMessage(errors.email)}
										</HelperText>
									</>
								)}
							/>

							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<TextInput
											dense
											mode="outlined"
											placeholder={t('s.login.password.placeholder')}
											secureTextEntry
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											error={!!errors.password}
										/>
										<HelperText type="error" visible={!!errors.password}>
											{getErrorMessage(errors.password)}
										</HelperText>
									</>
								)}
							/>

							<View style={styles.forgotPasswordContainer}>
								<Text
									style={styles.forgotPasswordText}
									onPress={() => router.push('/auth/forgot-password')}
								>
									{t('s.login.password.forgot')}
								</Text>
							</View>

							<Button
								mode="contained"
								buttonColor={theme.colors.primary}
								style={{ marginTop: 8 }}
								onPress={handleSubmit(onSubmit)}
							>
								{t('s.login.button.submit')}
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
		paddingHorizontal: 16,
		paddingBottom: 24,
	},
	forgotPasswordContainer: {
		alignItems: 'flex-end',
		marginBottom: 12,
	},
	forgotPasswordText: {
		textDecorationLine: 'underline',
		fontStyle: 'italic',
	},
})

export default LoginScreen
