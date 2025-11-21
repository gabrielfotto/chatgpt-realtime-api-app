import { Palette } from '@/constants/colors'
import { MD3DarkTheme as DefaultTheme } from 'react-native-paper'

export default {
	...DefaultTheme,
	myOwnProperty: true,
	colors: {
		...DefaultTheme.colors,
		primary: Palette.primary, // #0D1B2A - Azul estelar profundo
		secondary: Palette.secondary, // #3B4F73 - Azul violeta suave
		accent: Palette.accent, // #D8A7FF - Rosa-lilás luminoso
		background: Palette.primary,
		surface: Palette.backgroundAlt, // #1B263B - Cinza azulado
		surfaceVariant: Palette.secondary,
		onPrimary: Palette.textPrimary,
		onSecondary: Palette.textPrimary,
		onBackground: Palette.textPrimary, // #F8FAFC - Branco gelo
		onSurface: Palette.textPrimary,
		onSurfaceVariant: Palette.textSecondary, // #C4D0E2 - Branco levemente opaco
		error: Palette.error, // #E26A6A - Rosa-avermelhado
		errorContainer: Palette.error,
		onError: Palette.textPrimary,
		onErrorContainer: Palette.textPrimary,
		warning: Palette.warning, // #F7A45A - Laranja suave
		success: Palette.success, // #88E1B5 - Verde-menta
		tertiary: Palette.highlights, // #F2D29B - Dourado suave
		onTertiary: Palette.primary,
	},
}
