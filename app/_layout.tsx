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
		// Fontes do app de astrologia
		// Nota: As fontes precisam ser baixadas e adicionadas em assets/fonts/
		// Outfit - para headings
		'Outfit-Regular': require('@/assets/fonts/Outfit-Regular.ttf'),
		'Outfit-Medium': require('@/assets/fonts/Outfit-Medium.ttf'),
		'Outfit-SemiBold': require('@/assets/fonts/Outfit-SemiBold.ttf'),
		'Outfit-Bold': require('@/assets/fonts/Outfit-Bold.ttf'),
		// Inter - para body
		'Inter-Regular': require('@/assets/fonts/Inter_18pt-Regular.ttf'),
		'Inter-Medium': require('@/assets/fonts/Inter_18pt-Medium.ttf'),
		'Inter-SemiBold': require('@/assets/fonts/Inter_18pt-SemiBold.ttf'),
		'Inter-Bold': require('@/assets/fonts/Inter_18pt-Bold.ttf'),
		// Playfair Display - para títulos místicos
		'PlayfairDisplay-Regular': require('@/assets/fonts/PlayfairDisplay-Regular.ttf'),
		'PlayfairDisplay-Medium': require('@/assets/fonts/PlayfairDisplay-Medium.ttf'),
		'PlayfairDisplay-SemiBold': require('@/assets/fonts/PlayfairDisplay-SemiBold.ttf'),
		'PlayfairDisplay-Bold': require('@/assets/fonts/PlayfairDisplay-Bold.ttf'),
		// Mantendo SpaceMono para compatibilidade (pode ser removido depois)
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
