import { MD3LightTheme as DefaultTheme } from 'react-native-paper'

export default {
	...DefaultTheme,
	myOwnProperty: true,
	colors: {
		...DefaultTheme.colors,
		primary: '#218CDE',
	},
}
