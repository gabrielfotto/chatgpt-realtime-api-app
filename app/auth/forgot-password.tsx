import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import { useState } from 'react'
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
import {
	Button,
	HelperText,
	Text,
	TextInput,
	useTheme,
} from 'react-native-paper'
import * as yup from 'yup'

import RFAppLogo from '@/components/RFAppLogo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const ResetPasswordScreen = () => {
	const { t } = useTranslation(['auth', 'common'])

	// Move schema inside component to access translations
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
			email: '',
		},
	})

	const theme = useTheme()
	const [isEmailSent, setIsEmailSent] = useState(false)
	const [isEditingEmail, setIsEditingEmail] = useState(true)

	function onSubmit(data: TFormData) {
		setIsEditingEmail(false)
		setIsEmailSent(true)
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
							{t('s.forgotPassword.title')}
						</Text>

						{isEditingEmail && (
							<View>
								<Text variant="bodyLarge" style={{ marginTop: 5 }}>
									{t('s.forgotPassword.subtitle')}
								</Text>

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
													{errors.email && t(errors.email.message || '')}
												</HelperText>
											</>
										)}
									/>

									<Button
										mode="contained"
										buttonColor={theme.colors.primary}
										style={{ marginTop: 8 }}
										onPress={handleSubmit(onSubmit)}
									>
										{t('s.forgotPassword.button.submit')}
									</Button>
								</View>
							</View>
						)}

						{isEmailSent && !isEditingEmail && (
							<View>
								<Text variant="bodyLarge" style={{ marginTop: 5 }}>
									{t('s.forgotPassword.success')}
								</Text>
								<View style={styles.sentToContainer}>
									<Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
										gabrielf.otto@hotmail.com
									</Text>
									<Text> – </Text>
									<Pressable onPress={() => setIsEditingEmail(true)}>
										<View style={styles.editEmailContainer}>
											<Text variant="bodyLarge">{t('s.common.edit')}</Text>
											<MaterialCommunityIcons
												name="pencil"
												size={20}
												color={theme.colors.primary}
											/>
										</View>
									</Pressable>
								</View>

								<View style={{ marginTop: 16 }}>
									<Text variant="bodyLarge" style={{ marginTop: 5 }}>
										{t('s.forgotPassword.resend.text')}
									</Text>
									<Button
										mode="contained"
										buttonColor={theme.colors.primary}
										style={{ marginTop: 16 }}
										onPress={handleSubmit(onSubmit)}
									>
										{t('s.forgotPassword.resend.button')}
									</Button>
								</View>
							</View>
						)}

						<Button
							mode="outlined"
							style={{ marginTop: 16 }}
							onPress={() => router.push('/auth/login')}
						>
							{t('s.common.back')}
						</Button>
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
	sentToContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	editEmailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
})

export default ResetPasswordScreen
