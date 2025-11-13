import { Stack } from 'expo-router'

export default function FormLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					paddingHorizontal: 24,
					backgroundColor: 'white',
				},
			}}
		></Stack>
	)
}
