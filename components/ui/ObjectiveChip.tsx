import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { Palette } from '@/constants/colors'
import { TextStyles } from '@/constants/typography'

interface IObjectiveChipProps {
	label: string
	selected: boolean
	onPress: () => void
}

export const ObjectiveChip = ({
	label,
	selected,
	onPress,
}: IObjectiveChipProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.chip, selected && styles.chipSelected]}
			activeOpacity={0.7}
		>
			<Text style={[styles.chipText, selected && styles.chipTextSelected]}>
				{label}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	chip: {
		backgroundColor: Palette.secondary, // #3B4F73
		borderRadius: 50,
		paddingVertical: 6,
		paddingHorizontal: 14,
		marginRight: 8,
		marginBottom: 12,
	},
	chipSelected: {
		backgroundColor: Palette.accent, // Rosa-lilás quando selecionado
	},
	chipText: {
		...TextStyles.body2,
		color: Palette.textPrimary,
		fontFamily: 'Inter-Regular',
	},
	chipTextSelected: {
		color: '#0D0D0D',
		fontFamily: 'Inter-SemiBold',
	},
})

