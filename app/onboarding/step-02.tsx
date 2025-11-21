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
	name: yup.string().required('O nome é obrigatório'),
})

type TFormData = yup.InferType<typeof schema>

const OnboardingStep02 = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
		},
	})

	const handleSubmitData = (data: TFormData) => {
		console.log('Nome:', data.name)
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
					<View style={styles.content}>
						<ThemedText type="h2" style={styles.title}>
							Qual é o seu nome?
						</ThemedText>

						<View style={styles.inputContainer}>
							<Controller
								control={control}
								name="name"
								render={({ field: { onChange, onBlur, value } }) => (
									<AstrologyInput
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										placeholder="Digite seu nome"
										error={errors.name?.message}
										autoCapitalize="words"
									/>
								)}
							/>
						</View>

						<View style={styles.buttonContainer}>
							<PrimaryButton onPress={handleSubmit(handleSubmitData)}>
								Próximo
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
		marginBottom: 32,
		textAlign: 'center',
	},
	inputContainer: {
		marginBottom: 32,
	},
	buttonContainer: {
		width: '100%',
	},
})

export default OnboardingStep02
