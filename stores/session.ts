import { ESessionVoice } from '@/enums/session-voice'
import { create } from 'zustand'
// import { AvatarType } from '@/types/user'

type TStateProps = {
	type: 'voice'
	voice: ESessionVoice
	setSessionVoice: (voice: ESessionVoice) => void
}

export const useSession = create<TStateProps>(set => ({
	type: 'voice',
	voice: ESessionVoice.ALLOY,

	setSessionVoice: (voice: ESessionVoice) => {
		set({
			voice,
		})
	},
}))
