import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'

interface IRFCodeInputProps {
	value?: string
	onChange?: (value: string) => void
	error?: string
	length?: number
}

const RFCodeInput: React.FC<IRFCodeInputProps> = ({
	value,
	onChange,
	error,
	length = 6,
}) => {
	const codeInputRefs = useRef<any[]>([])

	return (
		<>
			<View style={styles.codeInputContainer}>
				{[...Array(length)].map((_, index) => (
					<TextInput
						key={index}
						ref={(el: any) => (codeInputRefs.current[index] = el)}
						style={styles.codeInput}
						mode="outlined"
						maxLength={1}
						value={(value || '')[index] || ''}
						onChangeText={text => {
							// Aceita apenas números
							if (text && !/^[0-9]$/.test(text)) {
								return
							}

							const newCode =
								(value || '').slice(0, index) +
								text +
								(value || '').slice(index + 1)
							onChange?.(newCode)

							if (text) {
								// Se um valor foi digitado e não é o último input, move para o próximo
								if (index < length - 1) {
									codeInputRefs.current[index + 1]?.focus()
								}
							} else {
								// Se o valor foi apagado e não é o primeiro input, move para o anterior
								if (index > 0) {
									codeInputRefs.current[index - 1]?.focus()
								}
							}
						}}
						keyboardType="numeric"
						textContentType="oneTimeCode"
						autoComplete="sms-otp"
						textAlign="center"
					/>
				))}
			</View>

			<HelperText type="error" visible={!!error}>
				{error}
			</HelperText>
		</>
	)
}

const styles = StyleSheet.create({
	codeInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	codeInput: {
		width: 48,
		height: 54,
		fontSize: 24,
	},
})

export default RFCodeInput
