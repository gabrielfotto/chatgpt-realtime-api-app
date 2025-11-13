import { PortalProvider } from '@gorhom/portal'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import 'react-native-reanimated'

import RFI18nProvider from '@/components/RFI18nProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useColorScheme } from '@/hooks/useColorScheme'
import theme from '@/theme'

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
	})

	if (!loaded) {
		// Async font loading only occurs in development.
		return null
	}

	return (
		<RFI18nProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<PaperProvider theme={theme}>
						<PortalProvider>
							<Stack screenOptions={{ headerShown: false }}>
								<Stack.Screen name="index" />
								<Stack.Screen name="auth" />
								<Stack.Screen name="(tabs)" />
								<Stack.Screen name="onboarding" />
								<Stack.Screen name="form" />
								<Stack.Screen name="session" />
								<Stack.Screen name="+not-found" />
							</Stack>
							<StatusBar style="auto" />
						</PortalProvider>
					</PaperProvider>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</RFI18nProvider>
	)
}
