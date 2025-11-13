import RFBottomSheet from '@/components/RFBottomSheet'
import theme from '@/theme'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import type { SingleChange } from 'react-native-paper-dates/lib/typescript/Date/Calendar'

interface IRFScheduleSessionBottomSheetProps {
	isActive: boolean
	onClose: () => void
	onSchedule?: (date: Date, hours: number, minutes: number) => void
}

const RFScheduleSessionBottomSheet = ({
	isActive,
	onClose,
	onSchedule,
}: IRFScheduleSessionBottomSheetProps) => {
	const { t } = useTranslation('tab-home')

	const [date, setDate] = useState<Date | undefined>(new Date())
	const [datePickerVisible, setDatePickerVisible] = useState(false)
	const [timePickerVisible, setTimePickerVisible] = useState(false)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)

	const onDismissDate = useCallback(() => {
		setDatePickerVisible(false)
	}, [])

	const onConfirmDate: SingleChange = useCallback(({ date }) => {
		setDatePickerVisible(false)
		setDate(date)
	}, [])

	const onDismissTime = useCallback(() => {
		setTimePickerVisible(false)
	}, [])

	const onConfirmTime = useCallback(
		({ hours, minutes }: { hours: number; minutes: number }) => {
			setTimePickerVisible(false)
			setHours(hours)
			setMinutes(minutes)
		},
		[]
	)

	const handleSchedule = useCallback(() => {
		if (date) {
			onSchedule?.(date, hours, minutes)
		}
		onClose()
	}, [date, hours, minutes, onClose, onSchedule])

	const formatTime = (value: number) => value.toString().padStart(2, '0')

	return (
		<RFBottomSheet isActive={isActive} onClose={onClose} snapPoints={['50%']}>
			<Text variant="headlineSmall" style={styles.bottomSheetTitle}>
				{t('c.schedule_session_bottom_sheet.title')}
			</Text>

			<View style={styles.bottomSheetContent}>
				<Text variant="labelLarge" style={styles.label}>
					{t('c.schedule_session_bottom_sheet.date.label')}
				</Text>

				<Button
					mode="outlined"
					onPress={() => setDatePickerVisible(true)}
					style={styles.dateButton}
				>
					{date?.toLocaleDateString('pt-BR') ||
						t('c.schedule_session_bottom_sheet.date.placeholder')}
				</Button>

				<DatePickerModal
					locale="pt"
					mode="single"
					visible={datePickerVisible}
					onDismiss={onDismissDate}
					date={date}
					onConfirm={onConfirmDate}
					validRange={{
						startDate: new Date(),
					}}
					presentationStyle="pageSheet"
				/>

				<Text variant="labelLarge" style={[styles.label, styles.timeLabel]}>
					{t('c.schedule_session_bottom_sheet.time.label')}
				</Text>

				<Button
					mode="outlined"
					onPress={() => setTimePickerVisible(true)}
					style={styles.timeButton}
				>
					{`${formatTime(hours)}:${formatTime(minutes)}`}
				</Button>

				<TimePickerModal
					visible={timePickerVisible}
					onDismiss={onDismissTime}
					onConfirm={onConfirmTime}
					hours={hours}
					minutes={minutes}
					label={t('c.schedule_session_bottom_sheet.time.select')}
					cancelLabel={t('c.schedule_session_bottom_sheet.time.cancel')}
					confirmLabel={t('c.schedule_session_bottom_sheet.time.confirm')}
				/>

				<Button
					mode="contained"
					style={styles.scheduleButton}
					onPress={handleSchedule}
				>
					{t('c.schedule_session_bottom_sheet.button')}
				</Button>
			</View>
		</RFBottomSheet>
	)
}

const styles = StyleSheet.create({
	bottomSheetTitle: {
		fontWeight: 'bold',
		color: theme.colors.primary,
		marginBottom: 24,
	},
	bottomSheetContent: {
		flex: 1,
	},
	label: {
		marginBottom: 8,
	},
	timeLabel: {
		marginTop: 24,
	},
	dateButton: {
		marginTop: 8,
	},
	timeButton: {
		marginTop: 8,
	},
	scheduleButton: {
		marginTop: 32,
	},
})

export default RFScheduleSessionBottomSheet
