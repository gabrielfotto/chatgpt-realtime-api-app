import theme from '@/theme'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { IconSymbol } from './ui/IconSymbol'

interface IRFCreditPackageButtonProps {
	sessions: number
	price: number
	savings: number
	onPress: () => void
}

const RFCreditPackageButton: React.FC<IRFCreditPackageButtonProps> = ({
	sessions,
	price,
	savings,
	onPress,
}) => {
	const { t } = useTranslation()

	return (
		<TouchableRipple
			onPress={onPress}
			style={styles.container}
			rippleColor="rgba(0, 0, 0, .1)"
			borderless
		>
			<View style={styles.content}>
				<View style={styles.leftContent}>
					<Text variant="titleMedium" style={styles.sessions}>
						{sessions}{' '}
						{t(
							sessions === 1
								? 'c.credit_package_button.session_singular'
								: 'c.credit_package_button.session_plural'
						)}
					</Text>
					{savings >= 0 && (
						<Text
							variant="bodySmall"
							style={[styles.savings, { color: 'white' }]}
						>
							{t('c.credit_package_button.savings', { amount: savings })}
						</Text>
					)}
				</View>

				<View style={styles.rightContent}>
					<Text variant="titleMedium" style={styles.price}>
						US$ {price}
					</Text>
					<View style={styles.iconContainer}>
						<IconSymbol name="chevron.right" size={20} color="#fff" />
					</View>
				</View>
			</View>
		</TouchableRipple>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5F5F5',
		borderRadius: 12,
		overflow: 'hidden',
		marginBottom: 8,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	leftContent: {
		width: '50%',
		padding: 16,
		justifyContent: 'center',
		backgroundColor: theme.colors.primary,
	},
	rightContent: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: 8,
		padding: 16,
		backgroundColor: '#F5F5F5',
	},
	sessions: {
		fontSize: 16,
		lineHeight: 24,
		color: 'white',
	},
	savings: {
		marginTop: 2,
	},
	price: {
		fontSize: 17,
		lineHeight: 24,
		marginRight: 4,
	},
	iconContainer: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: theme.colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default RFCreditPackageButton
