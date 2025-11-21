import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { Palette } from '@/constants/colors'
import { TextStyles } from '@/constants/typography'

interface ISecondaryButtonProps {
	onPress: () => void
	children: React.ReactNode
	disabled?: boolean
}

export const SecondaryButton = ({
	onPress,
	children,
	disabled = false,
}: ISecondaryButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			style={[styles.button, disabled && styles.buttonDisabled]}
			activeOpacity={0.8}
		>
			<Text style={styles.buttonText}>{children}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'transparent',
		borderWidth: 1.4,
		borderColor: Palette.highlights, // Dourado suave
		borderRadius: 16,
		height: 52,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	buttonText: {
		...TextStyles.body1,
		color: Palette.highlights,
		fontFamily: 'Inter-SemiBold',
	},
})

