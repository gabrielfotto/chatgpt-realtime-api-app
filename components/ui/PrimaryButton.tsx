import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Palette } from '@/constants/colors'
import { TextStyles } from '@/constants/typography'

interface IPrimaryButtonProps {
	onPress: () => void
	children: React.ReactNode
	disabled?: boolean
}

export const PrimaryButton = ({
	onPress,
	children,
	disabled = false,
}: IPrimaryButtonProps) => {
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
		backgroundColor: Palette.accent, // Rosa-lilás luminoso
		borderRadius: 16,
		height: 52,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: Palette.accent,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	buttonText: {
		...TextStyles.body1,
		color: '#0D0D0D',
		fontFamily: 'Inter-SemiBold',
	},
})

