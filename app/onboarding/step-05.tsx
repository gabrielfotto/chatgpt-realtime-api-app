import { router } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { AstrologyInput } from '@/components/ui/AstrologyInput'
import { ThemedText } from '@/components/ThemedText'
import { Palette } from '@/constants/colors'

const schema = yup.object({
	birthPlace: yup.string().required('O local de nascimento é obrigatório'),
})

type TFormData = yup.InferType<typeof schema>

const OnboardingStep05 = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			birthPlace: '',
		},
	})

	const handleSubmitData = (data: TFormData) => {
		console.log('Local de nascimento:', data.birthPlace)
		router.push('/onboarding/step-06')
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
					<View style={styles.content}>
						<ThemedText type="h2" style={styles.title}>
							Para criar seu mapa astral:
						</ThemedText>

						<ThemedText type="body1" style={styles.subtitle}>
							Local de nascimento
						</ThemedText>

						<View style={styles.inputContainer}>
							<Controller
								control={control}
								name="birthPlace"
								render={({ field: { onChange, onBlur, value } }) => (
									<AstrologyInput
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										placeholder="Digite a cidade"
										error={errors.birthPlace?.message}
										autoCapitalize="words"
									/>
								)}
							/>
							<ThemedText type="small" style={styles.hint}>
								Em breve: autocomplete com mapa
							</ThemedText>
						</View>

						<View style={styles.buttonContainer}>
							<PrimaryButton onPress={handleSubmit(handleSubmitData)}>
								Continuar
							</PrimaryButton>
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
		backgroundColor: Palette.primary,
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
		paddingVertical: 24,
	},
	title: {
		color: Palette.textPrimary,
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		color: Palette.textSecondary,
		marginBottom: 16,
		textAlign: 'center',
	},
	inputContainer: {
		marginBottom: 32,
	},
	hint: {
		color: Palette.textSecondary,
		marginTop: 8,
		textAlign: 'center',
		opacity: 0.7,
	},
	buttonContainer: {
		width: '100%',
	},
})

export default OnboardingStep05

