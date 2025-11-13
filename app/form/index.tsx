import RFAppLogo from '@/components/RFAppLogo'
import RFStepperForm from '@/components/RFStepForm'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const FormScreen = () => {
	const { t } = useTranslation('form')

	const steps = [
		{
			id: 1,
			question: t('s.form.steps.1.question'),
			options: [
				{ id: 'abandonment', label: t('s.form.steps.1.options.abandonment') },
				{ id: 'sexualAbuse', label: t('s.form.steps.1.options.sexualAbuse') },
				{ id: 'verbalAbuse', label: t('s.form.steps.1.options.verbalAbuse') },
				{
					id: 'familyConflicts',
					label: t('s.form.steps.1.options.familyConflicts'),
				},
				{ id: 'despair', label: t('s.form.steps.1.options.despair') },
				{
					id: 'financialDifficulties',
					label: t('s.form.steps.1.options.financialDifficulties'),
				},
				{ id: 'humiliations', label: t('s.form.steps.1.options.humiliations') },
				{ id: 'trauma', label: t('s.form.steps.1.options.trauma') },
				{ id: 'violence', label: t('s.form.steps.1.options.violence') },
			],
		},
		{
			id: 2,
			question: t('s.form.steps.2.question'),
			options: [
				{ id: 'alcoholism', label: t('s.form.steps.2.options.alcoholism') },
				{ id: 'anguish', label: t('s.form.steps.2.options.anguish') },
				{ id: 'anorexia', label: t('s.form.steps.2.options.anorexia') },
				{ id: 'anxiety', label: t('s.form.steps.2.options.anxiety') },
				{
					id: 'generalizedAnxiety',
					label: t('s.form.steps.2.options.generalizedAnxiety'),
				},
				{
					id: 'lowSelfEsteem',
					label: t('s.form.steps.2.options.lowSelfEsteem'),
				},
				{ id: 'borderline', label: t('s.form.steps.2.options.borderline') },
				{ id: 'bulimia', label: t('s.form.steps.2.options.bulimia') },
				{ id: 'burnout', label: t('s.form.steps.2.options.burnout') },
				{
					id: 'excessiveJealousy',
					label: t('s.form.steps.2.options.excessiveJealousy'),
				},
				{ id: 'bingeEating', label: t('s.form.steps.2.options.bingeEating') },
				{
					id: 'sexualCompulsion',
					label: t('s.form.steps.2.options.sexualCompulsion'),
				},
				{ id: 'depression', label: t('s.form.steps.2.options.depression') },
				{ id: 'despair', label: t('s.form.steps.2.options.despair') },
				{
					id: 'erectileDysfunction',
					label: t('s.form.steps.2.options.erectileDysfunction'),
				},
				{
					id: 'financialScarcity',
					label: t('s.form.steps.2.options.financialScarcity'),
				},
				{ id: 'lackOfLibido', label: t('s.form.steps.2.options.lackOfLibido') },
				{ id: 'phobias', label: t('s.form.steps.2.options.phobias') },
				{ id: 'failure', label: t('s.form.steps.2.options.failure') },
				{ id: 'frigidity', label: t('s.form.steps.2.options.frigidity') },
				{ id: 'insecurity', label: t('s.form.steps.2.options.insecurity') },
				{ id: 'fears', label: t('s.form.steps.2.options.fears') },
				{ id: 'moodSwing', label: t('s.form.steps.2.options.moodSwing') },
				{ id: 'panic', label: t('s.form.steps.2.options.panic') },
				{
					id: 'uncontrolledAnger',
					label: t('s.form.steps.2.options.uncontrolledAnger'),
				},
				{ id: 'remorse', label: t('s.form.steps.2.options.remorse') },
				{
					id: 'feelingOfGuilt',
					label: t('s.form.steps.2.options.feelingOfGuilt'),
				},
				{ id: 'loneliness', label: t('s.form.steps.2.options.loneliness') },
				{ id: 'toc', label: t('s.form.steps.2.options.toc') },
				{ id: 'deepSadness', label: t('s.form.steps.2.options.deepSadness') },
				{ id: 'shame', label: t('s.form.steps.2.options.shame') },
				{ id: 'bodyShame', label: t('s.form.steps.2.options.bodyShame') },
				{
					id: 'drugAddictions',
					label: t('s.form.steps.2.options.drugAddictions'),
				},
				{
					id: 'gamingAddictions',
					label: t('s.form.steps.2.options.gamingAddictions'),
				},
			],
		},
		{
			id: 3,
			question: t('s.form.steps.3.question'),
			options: [
				{ id: 'allergies', label: t('s.form.steps.3.options.allergies') },
				{ id: 'skinDiseases', label: t('s.form.steps.3.options.skinDiseases') },
				{
					id: 'autoimmuneDiseases',
					label: t('s.form.steps.3.options.autoimmuneDiseases'),
				},
				{ id: 'headache', label: t('s.form.steps.3.options.headache') },
				{ id: 'fibromyalgia', label: t('s.form.steps.3.options.fibromyalgia') },
			],
		},
		{
			id: 4,
			question: t('s.form.steps.4.question'),
			options: [
				{ id: 'abandonment', label: t('s.form.steps.4.options.abandonment') },
				{ id: 'illnesses', label: t('s.form.steps.4.options.illnesses') },
				{ id: 'death', label: t('s.form.steps.4.options.death') },
				{ id: 'poverty', label: t('s.form.steps.4.options.poverty') },
				{ id: 'loneliness', label: t('s.form.steps.4.options.loneliness') },
				{ id: 'oldAge', label: t('s.form.steps.4.options.oldAge') },
			],
		},
	]

	const handleComplete = (formData: Record<number, string[]>) => {
		console.log('Form data:', formData)
		router.push('/home')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<RFAppLogo />
				<RFStepperForm
					steps={steps}
					onComplete={handleComplete}
					introProps={{
						title: t('s.form.intro.title', { name: 'Antonio' }),
						paragraphs: [
							t('s.form.intro.paragraphs.0'),
							t('s.form.intro.paragraphs.1'),
							t('s.form.intro.paragraphs.2'),
							t('s.form.intro.paragraphs.3'),
						],
						buttonText: t('s.form.intro.buttonText'),
					}}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingTop: 16,
	},
})

export default FormScreen
