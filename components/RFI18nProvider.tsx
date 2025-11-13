import i18nConfig from '@/i18n/config'
import i18n from 'i18next'
import { PropsWithChildren, useEffect, useState } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'

// Initialize i18n outside of component to prevent multiple initializations
i18n.use(initReactI18next)

function I18nProvider({ children }: PropsWithChildren) {
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		const initI18n = async () => {
			if (!i18n.isInitialized) {
				await i18n.init({
					...i18nConfig,
					interpolation: {
						escapeValue: false,
					},
				})
			}
			setIsInitialized(true)
		}

		initI18n()
	}, [])

	if (!isInitialized) {
		return null
		// return (
		// 	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		// 		<ActivityIndicator size="large" />
		// 	</View>
		// )
	}

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export default I18nProvider
