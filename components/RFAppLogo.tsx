import { Image, StyleSheet, View } from 'react-native'

interface IRFAppLogoProps {
	width?: number
	height?: number
}

const RFAppLogo = ({ width = 120, height = 120 }: IRFAppLogoProps) => {
	return (
		<View style={styles.logoContainer}>
			<Image
				source={require('@/assets/images/react-logo.png')}
				style={[styles.logo, { width, height }]}
				resizeMode="contain"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	logoContainer: {
		alignItems: 'center',
	},
	logo: {},
})

export default RFAppLogo
