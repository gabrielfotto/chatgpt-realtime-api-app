import { Audio } from 'expo-av'
import React, { createContext, useRef, useState } from 'react'

export interface ISampleAudioContext {
	currentPlayingId: string | null
	playAudio: (id: string, audioFile: any) => Promise<void>
	pauseAudio: () => Promise<void>
}

export const SampleAudioContext = createContext<ISampleAudioContext>(
	{} as ISampleAudioContext
)
export const SampleAudioProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null)
	const soundRef = useRef<Audio.Sound | null>(null)

	const unloadCurrentAudio = async () => {
		if (soundRef.current) {
			try {
				await soundRef.current.unloadAsync()
			} catch (error) {
				console.error('Error unloading audio:', error)
			}

			soundRef.current = null
			setCurrentPlayingId(null)
		}
	}

	const playAudio = async (id: string, audioFile: any) => {
		try {
			// Se já existe um áudio tocando, descarrega ele primeiro
			await unloadCurrentAudio()

			// Carrega e toca o novo áudio
			const { sound } = await Audio.Sound.createAsync(audioFile, {
				shouldPlay: true,
				volume: 1.0,
			})

			sound.setOnPlaybackStatusUpdate(status => {
				if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
					setCurrentPlayingId(null)
					unloadCurrentAudio()
				}
			})

			soundRef.current = sound
			setCurrentPlayingId(id)
		} catch (error) {
			console.error('Error playing audio:', error)
			await unloadCurrentAudio()
		}
	}

	const pauseAudio = async () => {
		try {
			if (soundRef.current) {
				await soundRef.current.pauseAsync()
				await unloadCurrentAudio()
			}
		} catch (error) {
			console.error('Error pausing audio:', error)
			await unloadCurrentAudio()
		}
	}

	return (
		<SampleAudioContext.Provider
			value={{
				currentPlayingId,
				playAudio,
				pauseAudio,
			}}
		>
			{children}
		</SampleAudioContext.Provider>
	)
}
