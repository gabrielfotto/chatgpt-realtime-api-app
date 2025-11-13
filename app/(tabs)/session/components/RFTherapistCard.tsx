import theme from '@/theme'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper'
import { useSampleAudio } from '../hooks'

interface IRFTherapistCardProps {
	name: string
	gender: 'male' | 'female'
	onSelect: () => void
}

const RFTherapistCard = ({ name, gender, onSelect }: IRFTherapistCardProps) => {
	const { t } = useTranslation('tab-session')
	const { currentPlayingId, playAudio, pauseAudio } = useSampleAudio()
	const isPlaying = currentPlayingId === name

	const handlePlayPause = async () => {
		if (isPlaying) {
			await pauseAudio()
			return
		}

		const audioFile =
			name.toLowerCase() === 'alloy'
				? require('@/assets/audios/openai/openai-fm-alloy-audio.wav')
				: require('@/assets/audios/openai/openai-fm-echo-audio.wav')

		await playAudio(name, audioFile)
	}

	return (
		<View style={styles.cardWrapper}>
			<Avatar.Icon
				size={80}
				icon="account"
				style={styles.therapistAvatar}
				color="#fff"
			/>
			<Card style={styles.therapistCard}>
				<View style={styles.therapistContent}>
					<Text style={styles.therapistName}>{name}</Text>
					<Button
						mode="contained"
						style={[styles.playButton, isPlaying && styles.pauseButton]}
						labelStyle={styles.playButtonLabel}
						icon={isPlaying ? 'pause' : 'play'}
						onPress={handlePlayPause}
					>
						{isPlaying
							? t('c.therapist_card.pause')
							: t('c.therapist_card.play')}
					</Button>
					<Button
						mode="outlined"
						style={styles.selectButton}
						labelStyle={styles.selectButtonLabel}
						onPress={onSelect}
					>
						{t(`c.therapist_card.choose.${gender}`)}
					</Button>
				</View>
			</Card>
		</View>
	)
}

const styles = StyleSheet.create({
	cardWrapper: {
		marginTop: 40,
		alignItems: 'center',
		position: 'relative',
	},
	therapistAvatar: {
		position: 'absolute',
		top: -40,
		zIndex: 1,
		backgroundColor: theme.colors.primary,
		elevation: 4,
	},
	therapistCard: {
		backgroundColor: '#fff',
		elevation: 0,
		shadowColor: 'transparent',
		borderRadius: 16,
		overflow: 'hidden',
		width: '100%',
		paddingTop: 40,
	},
	therapistContent: {
		alignItems: 'center',
		padding: 24,
		paddingTop: 16,
	},
	therapistName: {
		fontSize: 16,
		marginBottom: 12,
	},
	playButton: {
		backgroundColor: '#000',
		borderRadius: 20,
		marginBottom: 12,
		width: 150,
	},
	playButtonLabel: {
		fontSize: 14,
		color: '#fff',
	},
	selectButton: {
		borderRadius: 20,
		borderColor: theme.colors.primary,
		width: 150,
	},
	selectButtonLabel: {
		fontSize: 14,
		color: theme.colors.primary,
	},
	pauseButton: {
		backgroundColor: '#D32F2F',
	},
})

export default RFTherapistCard
