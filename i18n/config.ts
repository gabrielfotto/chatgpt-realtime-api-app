import commonResourcesEnUS from './locales/en-US.json'
import commonResourcesEsES from './locales/es-ES.json'
import commonResourcesPtBR from './locales/pt-BR.json'

import authResources from '@/app/auth/i18n'
import formResources from '@/app/form/i18n'
import onboardingResources from '@/app/onboarding/i18n'
import sessionResources from '@/app/session/i18n'

import tabHomeResources from '@/app/(tabs)/home/i18n'
import tabSessionResources from '@/app/(tabs)/session/i18n'

import { getLocales } from 'expo-localization'
import type { InitOptions } from 'i18next'

const systemLocale = getLocales()[0]
const defaultLanguage = systemLocale?.languageTag || 'en-US'

const config: InitOptions = {
	resources: {
		'pt-BR': {
			common: commonResourcesPtBR,
			auth: authResources.ptBR,
			onboarding: onboardingResources.ptBR,
			form: formResources.ptBR,
			session: sessionResources.ptBR,
			// tabs
			'tab-home': tabHomeResources.ptBR,
			'tab-session': tabSessionResources.ptBR,
		},
		'en-US': {
			common: commonResourcesEnUS,
			auth: authResources.enUS,
			onboarding: onboardingResources.enUS,
			form: formResources.enUS,
			session: sessionResources.enUS,
			// tabs
			'tab-home': tabHomeResources.enUS,
			'tab-session': tabSessionResources.enUS,
		},
		'es-ES': {
			common: commonResourcesEsES,
			auth: authResources.esES,
			onboarding: onboardingResources.esES,
			form: formResources.esES,
			session: sessionResources.esES,
			// tabs
			'tab-home': tabHomeResources.esES,
			'tab-session': tabSessionResources.esES,
		},
	},
	lng: defaultLanguage,
	fallbackLng: 'en-US',
	defaultNS: 'common',
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
}

export default config
