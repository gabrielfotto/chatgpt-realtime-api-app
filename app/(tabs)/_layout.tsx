import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient'
import { router, Tabs, usePathname } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const CustomTabButton = ({
	style,
	children,
	...props
}: BottomTabBarButtonProps) => {
	return (
		<Pressable
			{...props}
			android_ripple={null}
			android_disableSound={true}
			style={[style, { opacity: 1 }]}
		>
			{children}
		</Pressable>
	)
}

const SessionTabButton = (props: BottomTabBarButtonProps) => {
	const theme = useTheme()
	const pathname = usePathname()

	const handlePress = () => {
		if (pathname !== '/session') {
			router.push('/session')
		}
	}

	return (
		<Pressable onPress={handlePress}>
			<View style={styles.sessionTabContainer}>
				<View style={styles.innerShadowContainer}>
					<View style={styles.outerShadowContainer}>
						<LinearGradient
							colors={[theme.colors.primary, '#165d93']}
							style={styles.centerButton}
						>
							<Image
								source={require('@/assets/images/react-logo.png')}
								style={styles.logo}
								resizeMode="contain"
							/>
						</LinearGradient>
					</View>
				</View>
			</View>
		</Pressable>
	)
}

export default function TabLayout() {
	const { t } = useTranslation()
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: CustomTabButton,
				tabBarBackground: TabBarBackground,
				tabBarStyle: {
					height: 80,
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					elevation: 8,
					borderTopWidth: 0,
					paddingHorizontal: 10,
					...Platform.select({
						ios: {
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: -2,
							},
							shadowOpacity: 0.15,
							shadowRadius: 12,
						},
						android: {
							elevation: 8,
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: -2,
							},
							shadowOpacity: 0.15,
							shadowRadius: 12,
						},
					}),
				},
				tabBarItemStyle: {
					height: 50,
					paddingBottom: 5,
				},
				tabBarLabelStyle: {
					fontSize: 11,
				},
				sceneStyle: {
					paddingHorizontal: 32,
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: t('bottom_navigation_tabs.home'),
					tabBarIcon: ({ color }) => (
						<IconSymbol size={20} name="house.fill" color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="sessions"
				options={{
					title: t('bottom_navigation_tabs.sessions'),
					tabBarIcon: ({ color }) => (
						<IconSymbol size={20} name="clock.fill" color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="session"
				options={{
					tabBarButton: props => <SessionTabButton {...props} />,
				}}
				listeners={{
					tabPress: e => {
						e.preventDefault()
					},
				}}
			/>

			<Tabs.Screen
				name="videos"
				options={{
					title: t('bottom_navigation_tabs.videos'),
					tabBarIcon: ({ color }) => (
						<IconSymbol size={20} name="play.fill" color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: t('bottom_navigation_tabs.profile'),
					tabBarIcon: ({ color }) => (
						<IconSymbol size={20} name="person.fill" color={color} />
					),
				}}
			/>
		</Tabs>
	)
}

const styles = StyleSheet.create({
	sessionTabContainer: {
		width: 90,
		height: 90,
		position: 'absolute',
		top: -35,
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerShadowContainer: {
		width: 86,
		height: 86,
		borderRadius: 43,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	outerShadowContainer: {
		width: 86,
		height: 86,
		borderRadius: 43,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	centerButton: {
		width: 65,
		height: 65,
		borderRadius: 32.5,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.15,
		shadowRadius: 2,
		elevation: 3,
	},
	logo: {
		width: 40,
		height: 40,
		tintColor: '#fff',
	},
})
