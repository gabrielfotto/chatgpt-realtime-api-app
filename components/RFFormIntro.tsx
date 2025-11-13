import theme from '@/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import RFStepTimeline from './RFStepTimeline'

interface IRFFormIntroProps {
	userName?: string
	onStart: () => void
	totalSteps: number
	/**
	 * Título que aparece após o nome do usuário
	 */
	title?: string
	/**
	 * Array de parágrafos que serão exibidos na introdução
	 */
	paragraphs?: string[]
	/**
	 * Texto do botão de ação
	 */
	buttonText?: string
}

const RFFormIntro = ({
	onStart,
	totalSteps,
	title,
	paragraphs = [],
	buttonText = 'Começar',
}: IRFFormIntroProps) => {
	const insets = useSafeAreaInsets()

	return (
		<View style={styles.container}>
			{/* Timeline with chevron */}
			<View style={styles.timelineContainer}>
				<RFStepTimeline
					totalSteps={totalSteps}
					currentStep={0}
					customFirstIcon={
						<MaterialCommunityIcons
							name="chevron-right"
							size={24}
							color={theme.colors.primary}
						/>
					}
				/>
			</View>

			<View style={styles.content}>
				{/* Welcome message */}
				{title && (
					<Text variant="headlineSmall" style={styles.name}>
						{title},
					</Text>
				)}

				{/* Paragraphs */}
				{paragraphs.map((paragraph, index) => (
					<Text key={index} variant="bodyLarge" style={styles.description}>
						{paragraph}
					</Text>
				))}
			</View>

			<SafeAreaView edges={['bottom']} style={styles.footer}>
				<View
					style={[
						styles.footerContent,
						{ paddingBottom: Math.max(16, insets.bottom) },
					]}
				>
					{/* Start button */}
					<Button
						mode="contained"
						onPress={onStart}
						style={styles.button}
						contentStyle={styles.buttonContent}
						labelStyle={styles.buttonLabel}
					>
						{buttonText}
					</Button>
				</View>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	timelineContainer: {
		// paddingTop: 16,
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 12,
	},
	name: {
		fontWeight: 'bold',
		marginBottom: 8,
	},
	description: {
		marginBottom: 12,
		lineHeight: 24,
	},
	footer: {
		backgroundColor: 'transparent',
		width: '100%',
	},
	footerContent: {
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	button: {
		borderRadius: 100,
		backgroundColor: theme.colors.primary,
	},
	buttonContent: {
		height: 48,
	},
	buttonLabel: {
		fontSize: 16,
	},
})

export default RFFormIntro
