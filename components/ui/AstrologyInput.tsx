import { StyleSheet, TextInput, View } from 'react-native'
import { HelperText } from 'react-native-paper'
import { Palette } from '@/constants/colors'
import { TextStyles } from '@/constants/typography'

interface IAstrologyInputProps {
	value: string
	onChangeText: (text: string) => void
	placeholder?: string
	error?: string
	keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
	secureTextEntry?: boolean
	onBlur?: () => void
	editable?: boolean
}

export const AstrologyInput = ({
	value,
	onChangeText,
	placeholder,
	error,
	keyboardType = 'default',
	autoCapitalize = 'sentences',
	secureTextEntry = false,
	onBlur,
	editable = true,
}: IAstrologyInputProps) => {
	return (
		<View>
			<TextInput
				style={[styles.input, error && styles.inputError]}
				value={value}
				onChangeText={onChangeText}
				onBlur={onBlur}
				placeholder={placeholder}
				placeholderTextColor={Palette.textSecondary}
				keyboardType={keyboardType}
				autoCapitalize={autoCapitalize}
				secureTextEntry={secureTextEntry}
				editable={editable}
			/>
			{error && (
				<HelperText type="error" visible={!!error} style={styles.helperText}>
					{error}
				</HelperText>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: `${Palette.primary}B3`, // #0D1B2A com 70% opacidade
		borderWidth: 1,
		borderColor: '#33415C', // Violeta escuro
		borderRadius: 14,
		paddingHorizontal: 16,
		paddingVertical: 14,
		...TextStyles.body1,
		color: Palette.textPrimary,
		fontFamily: 'Inter-Regular',
	},
	inputError: {
		borderColor: Palette.error,
	},
	helperText: {
		marginTop: 4,
		color: Palette.error,
	},
})

