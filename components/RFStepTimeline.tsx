import theme from '@/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

interface IRFStepTimelineProps {
	totalSteps: number
	currentStep: number
	customFirstIcon?: ReactNode
}

const RFStepTimeline = ({
	totalSteps,
	currentStep,
	customFirstIcon,
}: IRFStepTimelineProps) => {
	const isIntro = currentStep === 0
	const isPastIntro = currentStep > 0

	return (
		<View style={styles.container}>
			<View style={styles.timelineContent}>
				{/* Intro step */}
				<View style={styles.stepWrapper}>
					<View
						style={[
							styles.circle,
							styles.introCircle,
							isPastIntro && styles.pastCircle,
						]}
					>
						<MaterialCommunityIcons
							name="chevron-right"
							size={24}
							color={isPastIntro ? 'white' : theme.colors.primary}
						/>
					</View>
				</View>

				{/* Form steps */}
				{Array.from({ length: totalSteps }, (_, index) => {
					const stepNumber = index + 1
					const isActive = currentStep === stepNumber
					const isPast = currentStep > stepNumber

					return (
						<View key={stepNumber} style={styles.stepWrapper}>
							{/* Step circle */}
							<View
								style={[
									styles.circle,
									isActive && styles.activeCircle,
									isPast && styles.pastCircle,
								]}
							>
								<Text
									style={[
										styles.stepText,
										(isActive || isPast) && styles.activeStepText,
									]}
								>
									{stepNumber}
								</Text>
							</View>
						</View>
					)
				})}

				{/* Connector lines */}
				<View style={styles.linesContainer}>
					{Array.from({ length: totalSteps }, (_, index) => (
						<View
							key={`line-${index}`}
							style={[styles.line, index < currentStep && styles.activeLine]}
						/>
					))}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	timelineContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		position: 'relative',
	},
	stepWrapper: {
		zIndex: 1,
	},
	circle: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#E0E0E0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	introCircle: {
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: theme.colors.primary,
	},
	activeCircle: {
		backgroundColor: theme.colors.primary,
	},
	pastCircle: {
		backgroundColor: theme.colors.primary,
	},
	stepText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	activeStepText: {
		color: 'white',
	},
	linesContainer: {
		position: 'absolute',
		left: 16,
		right: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	line: {
		flex: 1,
		height: 2,
		backgroundColor: '#E0E0E0',
		marginHorizontal: 8,
	},
	activeLine: {
		backgroundColor: theme.colors.primary,
	},
})

export default RFStepTimeline
