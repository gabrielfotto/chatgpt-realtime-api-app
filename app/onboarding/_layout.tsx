import { Stack } from 'expo-router'

export default function OnboardingLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					paddingHorizontal: 30,
					backgroundColor: 'white',
				},
			}}
		></Stack>
	)
}
