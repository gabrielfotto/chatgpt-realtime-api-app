import { Step } from '@/types/stepper-form'
import { useState } from 'react'

interface IUseStepperFormProps {
	steps: Step[]
	onComplete: (formData: any) => void
}

const useStepperForm = ({ steps, onComplete }: IUseStepperFormProps) => {
	const [currentStep, setCurrentStep] = useState(1)
	const [formData, setFormData] = useState<Record<number, string[]>>({})

	const handleNext = () => {
		if (currentStep < steps.length) {
			setCurrentStep(prev => prev + 1)
		} else {
			onComplete(formData)
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(prev => prev - 1)
		}
	}

	const handleSelectOption = (
		stepId: number,
		optionId: string,
		selected: boolean
	) => {
		setFormData(prev => {
			const stepSelections = prev[stepId] || []
			if (selected) {
				return { ...prev, [stepId]: [...stepSelections, optionId] }
			}
			return { ...prev, [stepId]: stepSelections.filter(id => id !== optionId) }
		})
	}

	return {
		currentStep,
		formData,
		handleNext,
		handleBack,
		handleSelectOption,
		isFirstStep: currentStep === 1,
		isLastStep: currentStep === steps.length,
	}
}

export default useStepperForm
