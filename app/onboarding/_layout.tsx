import { Stack } from 'expo-router'
import { Palette } from '@/constants/colors'

export default function OnboardingLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					paddingHorizontal: 24,
					backgroundColor: Palette.primary,
				},
			}}
		></Stack>
	)
}
