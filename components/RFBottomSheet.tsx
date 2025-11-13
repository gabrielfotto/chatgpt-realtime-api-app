import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'

interface IRFBottomSheetProps {
	children: React.ReactNode
	snapPoints?: string[] | number[]
	isActive: boolean
	onClose: () => void
	enablePanDownToClose?: boolean
	enableOverDrag?: boolean
}

const RFBottomSheet: React.FC<IRFBottomSheetProps> = ({
	children,
	snapPoints: customSnapPoints,
	isActive,
	onClose,
	enablePanDownToClose = true,
	enableOverDrag = true,
}) => {
	const bottomSheetRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(
		() => customSnapPoints || ['70%'],
		[customSnapPoints]
	)

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.5}
			/>
		),
		[]
	)

	// Effect to control the bottom sheet visibility
	useEffect(() => {
		if (isActive) {
			bottomSheetRef.current?.snapToIndex(0)
		} else {
			bottomSheetRef.current?.close()
		}
	}, [isActive])

	return (
		<Portal>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				index={-1}
				enablePanDownToClose={enablePanDownToClose}
				enableOverDrag={enableOverDrag}
				backdropComponent={renderBackdrop}
				onChange={index => {
					if (index === -1) {
						onClose()
					}
				}}
			>
				<BottomSheetView style={styles.contentContainer}>
					{children}
				</BottomSheetView>
			</BottomSheet>
		</Portal>
	)
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		paddingVertical: 24,
		paddingHorizontal: 30,
	},
})

export default RFBottomSheet
