import { StyleSheet, Text, type TextProps } from 'react-native'

import { Palette } from '@/constants/colors'
import { TextStyles } from '@/constants/typography'
import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedTextProps = TextProps & {
	lightColor?: string
	darkColor?: string
	type?:
		| 'default'
		| 'title'
		| 'defaultSemiBold'
		| 'subtitle'
		| 'link'
		| 'h1'
		| 'h2'
		| 'h3'
		| 'body1'
		| 'body2'
		| 'small'
		| 'mystical'
}

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = 'default',
	...rest
}: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

	return (
		<Text
			style={[
				{ color },
				type === 'default' || type === 'body1' ? styles.body1 : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'title' || type === 'h1' ? styles.h1 : undefined,
				type === 'subtitle' || type === 'h2' ? styles.h2 : undefined,
				type === 'h3' ? styles.h3 : undefined,
				type === 'body2' ? styles.body2 : undefined,
				type === 'small' ? styles.small : undefined,
				type === 'mystical' ? styles.mystical : undefined,
				type === 'link' ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	)
}

const styles = StyleSheet.create({
	// Headings (Outfit)
	h1: {
		...TextStyles.h1,
	},
	h2: {
		...TextStyles.h2,
	},
	h3: {
		...TextStyles.h3,
	},
	// Body (Inter)
	body1: {
		...TextStyles.body1,
	},
	body2: {
		...TextStyles.body2,
	},
	small: {
		...TextStyles.small,
	},
	// Mystical (Playfair Display)
	mystical: {
		...TextStyles.mystical,
	},
	// Legacy support
	default: {
		...TextStyles.body1,
	},
	defaultSemiBold: {
		...TextStyles.body1,
		fontFamily: 'Inter-SemiBold',
	},
	title: {
		...TextStyles.h1,
	},
	subtitle: {
		...TextStyles.h2,
	},
	link: {
		...TextStyles.body1,
		color: Palette.accent,
	},
})
