import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'
import {
	Button,
	HelperText,
	Text,
	TextInput,
	useTheme,
} from 'react-native-paper'
import * as yup from 'yup'

import { useLocales } from 'expo-localization'

import RFLanguageSelectBottomSheet from '@/app/onboarding/components/RFLanguageSelectBottomSheet'
import RFAppLogo from '@/components/RFAppLogo'
import { LANGUAGES } from '@/constants/languages'
import { ILanguage } from '@/interfaces/language'
import FlagIcon from 'react-native-ico-flags'
import { SafeAreaView } from 'react-native-safe-area-context'

const OnboardingStep01 = () => {
	const { t, i18n } = useTranslation('onboarding')
	const [locale] = useLocales()
	const theme = useTheme()

	const defaultLanguage =
		LANGUAGES.find(language => language.code === locale?.languageCode) ||
		LANGUAGES[0]

	const [selectedLanguage, setSelectedLanguage] =
		useState<ILanguage>(defaultLanguage)

	const handleLanguageChange = (language: ILanguage) => {
		setSelectedLanguage(language)
		i18n.changeLanguage(language.tag)
	}

	// Move schema inside component to access translations
	// const schema = yup.object({
	// 	language: yup
	// 		.mixed<ILanguage>()
	// 		.required(t('s.onboarding.step01.validation.selectLanguage'))
	// 		.defined(t('s.onboarding.step01.validation.selectLanguage')),
	// })

	const schema = yup.object({
		language: yup.mixed<ILanguage>().optional(),
	})

	type TFormData = yup.InferType<typeof schema>

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			language: defaultLanguage,
		},
	})

	const [isBottomSheetActive, setIsBottomSheetActive] = useState(false)

	function onSubmit(data: IFormData) {
		console.log('Idioma selecionado:', data.language)
		router.push('/onboarding/step-02')
	}

	return (
		<SafeAreaView style={styles.container}>
			<RFAppLogo />

			<View style={styles.content}>
				<Text
					variant="titleLarge"
					style={{ fontWeight: 'bold', color: theme.colors.primary }}
				>
					{t('s.step01.title')}
				</Text>
				<Text variant="bodyLarge" style={{ marginTop: 5 }}>
					{t('s.step01.subtitle')}
				</Text>
				<View style={{ marginTop: 36 }}>
					<Controller
						control={control}
						name="language"
						render={({ field: { onChange, value } }) => (
							<>
								<Pressable onPress={() => setIsBottomSheetActive(true)}>
									<TextInput
										dense
										readOnly
										mode="outlined"
										left={
											<TextInput.Icon
												onPress={() => setIsBottomSheetActive(true)}
												icon={props => (
													<FlagIcon
														name={selectedLanguage.flag}
														width={32}
														height={32 * 0.75}
													/>
												)}
											/>
										}
										right={
											<TextInput.Icon
												onPress={() => setIsBottomSheetActive(true)}
												icon="chevron-down"
											/>
										}
										value={selectedLanguage.name}
									/>
								</Pressable>
								<HelperText type="error" visible={!!errors.language}>
									{t(errors.language?.message || '')}
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
						{t('s.step01.button.continue')}
					</Button>
				</View>
				<View style={{ marginTop: 50 }}>
					<Text variant="bodySmall" style={{ maxWidth: '80%' }}>
						{t('s.step01.terms.text', {
							termsLink: t('s.step01.terms.termsLink'),
							privacyLink: t('s.step01.terms.privacyLink'),
						})}
					</Text>
				</View>
			</View>

			<RFLanguageSelectBottomSheet
				isActive={isBottomSheetActive}
				onClose={() => setIsBottomSheetActive(false)}
				value={selectedLanguage}
				onChange={handleLanguageChange}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		marginTop: -40,
	},
})

export default OnboardingStep01
