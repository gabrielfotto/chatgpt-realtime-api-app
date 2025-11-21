import { router } from 'expo-router'
import { useState } from 'react'
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { ObjectiveChip } from '@/components/ui/ObjectiveChip'
import { ThemedText } from '@/components/ThemedText'
import { Palette } from '@/constants/colors'

type Objective = {
	id: string
	label: string
}

const objectives: Objective[] = [
	{ id: 'love', label: 'Amor & Relacionamentos' },
	{ id: 'anxiety', label: 'Ansiedade & emoções' },
	{ id: 'career', label: 'Carreira & dinheiro' },
	{ id: 'self-knowledge', label: 'Autoconhecimento' },
	{ id: 'productivity', label: 'Produtividade' },
]

const OnboardingStep06 = () => {
	const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])

	const toggleObjective = (id: string) => {
		setSelectedObjectives(prev =>
			prev.includes(id)
				? prev.filter(objId => objId !== id)
				: [...prev, id]
		)
	}

	const handleFinish = () => {
		console.log('Objetivos selecionados:', selectedObjectives)
		// Navegar para a próxima tela (home ou dashboard)
		router.push('/(tabs)/home')
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
							O que você quer melhorar?
						</ThemedText>

						<View style={styles.chipsContainer}>
							{objectives.map(objective => (
								<ObjectiveChip
									key={objective.id}
									label={objective.label}
									selected={selectedObjectives.includes(objective.id)}
									onPress={() => toggleObjective(objective.id)}
								/>
							))}
						</View>

						<View style={styles.buttonContainer}>
							<PrimaryButton
								onPress={handleFinish}
								disabled={selectedObjectives.length === 0}
							>
								Finalizar
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
		paddingBottom: 24,
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
	chipsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginBottom: 48,
	},
	buttonContainer: {
		width: '100%',
	},
})

export default OnboardingStep06
