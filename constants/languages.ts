import { ILanguage } from '@/interfaces/language'

export const LANGUAGES: ILanguage[] = [
	{
		key: 1,
		tag: 'en-US',
		code: 'en',
		name: 'English',
		flag: 'united-states-of-america',
		selected: true,
	},
	{
		key: 2,
		tag: 'pt-BR',
		code: 'pt',
		name: 'Português do Brasil',
		flag: 'brazil',
	},
	{
		key: 3,
		tag: 'pt-BR',
		// tag: 'pt-PT',
		code: 'pt',
		name: 'Português de Portugal',
		flag: 'portugal',
	},
	{
		key: 4,
		tag: 'es-ES',
		code: 'es',
		name: 'Español',
		flag: 'spain',
	},
]
