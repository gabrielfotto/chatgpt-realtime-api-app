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
import { TimePickerModal } from 'react-native-paper-dates'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { AstrologyInput } from '@/components/ui/AstrologyInput'
import { ThemedText } from '@/components/ThemedText'
import { Palette } from '@/constants/colors'

const schema = yup.object({
	birthTime: yup
		.string()
		.required('A hora de nascimento é obrigatória')
		.matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido (hh:mm)'),
})

type TFormData = yup.InferType<typeof schema>

const OnboardingStep04 = () => {
	const [timePickerVisible, setTimePickerVisible] = useState(false)
	const [selectedTime, setSelectedTime] = useState<{
		hours: number
		minutes: number
	} | null>(null)

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			birthTime: '',
		},
	})

	const birthTime = watch('birthTime')

	const onDismiss = () => {
		setTimePickerVisible(false)
	}

	const onConfirm = (params: { hours: number; minutes: number }) => {
		setTimePickerVisible(false)
		setSelectedTime(params)
		const timeString = `${String(params.hours).padStart(2, '0')}:${String(
			params.minutes
		).padStart(2, '0')}`
		setValue('birthTime', timeString)
	}

	const handleSubmitData = (data: TFormData) => {
		console.log('Hora de nascimento:', data.birthTime)
		router.push('/onboarding/step-05')
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
							Hora de nascimento
						</ThemedText>

						<View style={styles.inputContainer}>
							<Pressable onPress={() => setTimePickerVisible(true)}>
								<AstrologyInput
									value={birthTime}
									onChangeText={() => {}}
									placeholder="hh:mm"
									error={errors.birthTime?.message}
									editable={false}
								/>
							</Pressable>
						</View>

						<View style={styles.buttonContainer}>
							<PrimaryButton onPress={handleSubmit(handleSubmitData)}>
								Continuar
							</PrimaryButton>
						</View>

						<TimePickerModal
							visible={timePickerVisible}
							onDismiss={onDismiss}
							onConfirm={onConfirm}
							hours={selectedTime?.hours || 12}
							minutes={selectedTime?.minutes || 0}
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

export default OnboardingStep04
