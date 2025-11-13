import { useContext } from 'react'
import {
	ISampleAudioContext,
	SampleAudioContext,
} from '../contexts/sample-audio'

export const useSampleAudio = (): ISampleAudioContext => {
	const context = useContext(SampleAudioContext)
	if (!context) {
		throw new Error('useSampleAudio must be used within an SampleAudioProvider')
	}

	return context
}
