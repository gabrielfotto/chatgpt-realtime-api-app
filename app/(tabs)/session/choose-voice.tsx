import RFAppLogo from '@/components/RFAppLogo'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import RFTherapistCard from './components/RFTherapistCard'
import { SampleAudioProvider } from './contexts/sample-audio'

import { ESessionVoice } from '@/enums/session-voice'
import { useSession } from '@/stores/session'
import { useSampleAudio } from './hooks'

const ChooseVoiceContent = () => {
	const { t } = useTranslation('tab-session')
	const { setSessionVoice } = useSession()
	const { pauseAudio } = useSampleAudio()

	const handleChooseVoice = async (voice: ESessionVoice) => {
		await pauseAudio()
		setSessionVoice(voice)
		router.push('/session/voice')
	}

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
			>
				<RFAppLogo />

				<Text style={styles.title}>{t('s.choose_voice.title')}</Text>

				<View style={styles.therapistsContainer}>
					<RFTherapistCard
						name="Alloy"
						gender="female"
						onSelect={() => handleChooseVoice(ESessionVoice.ALLOY)}
					/>

					<RFTherapistCard
						name="Echo"
						gender="male"
						onSelect={() => handleChooseVoice(ESessionVoice.ECHO)}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const ChooseVoiceScreen = () => {
	return (
		<SampleAudioProvider>
			<ChooseVoiceContent />
		</SampleAudioProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 140,
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 32,
		lineHeight: 28,
	},
	therapistsContainer: {
		paddingHorizontal: 16,
		gap: 24,
	},
})

export default ChooseVoiceScreen
