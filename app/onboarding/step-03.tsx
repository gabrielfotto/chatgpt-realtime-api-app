import { router } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DatePickerModal } from 'react-native-paper-dates'
import type { SingleChange } from 'react-native-paper-dates/lib/typescript/Date/Calendar'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { AstrologyInput } from '@/components/ui/AstrologyInput'
import { ThemedText } from '@/components/ThemedText'
import { Palette } from '@/constants/colors'
// Usando formatação simples sem date-fns por enquanto
// import { format } from 'date-fns'
// import { ptBR } from 'date-fns/locale'

const schema = yup.object({
	birthDate: yup.date().required('A data de nascimento é obrigatória'),
})

type TFormData = yup.InferType<typeof schema>

const OnboardingStep03 = () => {
	const [datePickerVisible, setDatePickerVisible] = useState(false)

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			birthDate: undefined,
		},
	})

	const birthDate = watch('birthDate')

	const onDismissSingle = () => {
		setDatePickerVisible(false)
	}

	const onConfirmSingle: SingleChange = params => {
		setDatePickerVisible(false)
		setValue('birthDate', params.date)
	}

	const handleSubmitData = (data: TFormData) => {
		console.log('Data de nascimento:', data.birthDate)
		router.push('/onboarding/step-04')
	}

	const formattedDate = birthDate
		? `${String(birthDate.getDate()).padStart(2, '0')}/${String(
				birthDate.getMonth() + 1
		  ).padStart(2, '0')}/${birthDate.getFullYear()}`
		: ''

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
							Data de nascimento
						</ThemedText>

						<View style={styles.inputContainer}>
							<Pressable onPress={() => setDatePickerVisible(true)}>
								<AstrologyInput
									value={formattedDate}
									onChangeText={() => {}}
									placeholder="dd/mm/aaaa"
									error={errors.birthDate?.message}
									editable={false}
								/>
							</Pressable>
						</View>

						<View style={styles.buttonContainer}>
							<PrimaryButton onPress={handleSubmit(handleSubmitData)}>
								Continuar
							</PrimaryButton>
						</View>

						<DatePickerModal
							locale="pt"
							mode="single"
							visible={datePickerVisible}
							onDismiss={onDismissSingle}
							date={birthDate}
							onConfirm={onConfirmSingle}
							validRange={{
								startDate: new Date(1900, 0, 1),
								endDate: new Date(),
							}}
						/>
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
	buttonContainer: {
		width: '100%',
	},
})

export default OnboardingStep03
