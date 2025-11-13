import RFFormIntro from '@/components/RFFormIntro'
import RFStepTimeline from '@/components/RFStepTimeline'
import useStepperForm from '@/hooks/useStepperForm'
import theme from '@/theme'
import { Step } from '@/types/stepper-form'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Checkbox, Text } from 'react-native-paper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

interface IRFStepFormProps {
	steps: Step[]
	onComplete: (data: any) => void
	/**
	 * Props para customizar a tela de introdução
	 */
	introProps?: {
		title?: string
		paragraphs: string[]
		buttonText?: string
	}
}

const RFStepForm = ({ steps, onComplete, introProps }: IRFStepFormProps) => {
	const { t } = useTranslation()

	const [showIntro, setShowIntro] = useState(true)
	const insets = useSafeAreaInsets()
	const {
		currentStep,
		formData,
		handleNext,
		handleBack,
		handleSelectOption,
		isFirstStep,
		isLastStep,
	} = useStepperForm({ steps, onComplete })

	const handleBackClick = () => {
		if (currentStep === 1) {
			setShowIntro(true)
		} else {
			handleBack()
		}
	}

	if (showIntro) {
		return (
			<RFFormIntro
				onStart={() => setShowIntro(false)}
				totalSteps={steps.length}
				{...introProps}
			/>
		)
	}

	return (
		<Fragment>
			{/* Timeline */}
			<RFStepTimeline totalSteps={steps.length} currentStep={currentStep} />

			{/* Question */}
			<Text variant="titleLarge" style={styles.question}>
				{steps[currentStep - 1].question}
			</Text>

			{/* Options */}
			<ScrollView
				style={styles.optionsContainer}
				showsVerticalScrollIndicator={false}
			>
				{steps[currentStep - 1].options.map(option => (
					<Pressable
						key={option.id}
						style={styles.checkboxContainer}
						onPress={() =>
							handleSelectOption(
								currentStep,
								option.id,
								!formData[currentStep]?.includes(option.id)
							)
						}
					>
						<Checkbox
							status={
								formData[currentStep]?.includes(option.id)
									? 'checked'
									: 'unchecked'
							}
							color={theme.colors.primary}
						/>
						<Text style={styles.checkboxLabel}>{option.label}</Text>
					</Pressable>
				))}
			</ScrollView>

			{/* Footer */}
			<SafeAreaView edges={['bottom']} style={styles.footer}>
				<View
					style={[
						styles.footerContent,
						{ paddingBottom: Math.max(16, insets.bottom) },
					]}
				>
					<Button
						mode="outlined"
						onPress={handleBackClick}
						style={[styles.footerButton, styles.backButton]}
						labelStyle={styles.backButtonLabel}
					>
						{t('button.back')}
					</Button>
					<Button
						mode="contained"
						onPress={handleNext}
						style={[styles.footerButton, styles.nextButton]}
						contentStyle={styles.nextButtonContent}
						labelStyle={styles.nextButtonLabel}
					>
						{isLastStep ? t('button.complete') : t('button.continue')}
					</Button>
				</View>
			</SafeAreaView>
		</Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	optionsContainer: {
		flex: 1,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	checkboxLabel: {
		fontSize: 16,
		flex: 1,
		marginLeft: 12,
	},
	question: {
		fontWeight: 'bold',
		marginVertical: 16,
		paddingHorizontal: 16,
		lineHeight: 24,
	},
	footer: {
		backgroundColor: 'transparent',
		width: '100%',
	},
	footerContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	footerButton: {
		minWidth: 120,
		borderRadius: 100,
	},
	backButton: {},
	backButtonLabel: {},
	nextButton: {
		flexGrow: 1,
		marginLeft: 16,
	},
	nextButtonContent: {},
	nextButtonLabel: {},
})

export default RFStepForm
