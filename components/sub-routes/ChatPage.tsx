import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import Icons from '../../assets/icons'
import useAppColor from '../../themed/appColor'

const ChatPage = React.memo((props: any) => {
	const appColor = useAppColor()
	const [mainIconsHidden, setMainIconsHidden] = React.useState<boolean>(false)
	const [showExpandBtn, setShowExpandBtn] = React.useState<boolean>(false)

	const handleInputLayout = React.useCallback((event: any) => {
		const { height } = event.nativeEvent.layout
		if (height > 75) {
			setShowExpandBtn(true)
		} else {
			setShowExpandBtn(false)
		}
	}, [])

	return (
		<SafeAreaView style={{ backgroundColor: appColor.main_bg }}>
			<View style={{ height: '100%', width: '100%', paddingTop: 10 }}>
				{/* <View style={{ flex: 1, flexShrink: 0, backgroundColor: 'green' }}>
					<CustomView style={{ paddingHorizontal: 20 }}>
						<View></View>
					</CustomView>
				</View> */}

				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<View
						style={{
							borderRadius: 50,
							padding: 10,
							backgroundColor: appColor.bold_text,
						}}
					>
						<Icons.OpenAIIconChat style={{ width: 40, height: 40 }} />
					</View>
				</View>
				<View style={[styles.text_box_container, { paddingTop: 10 }]}>
					<View
						style={{
							flexDirection: 'row',
							flexShrink: 1,
							marginRight: 20,
							alignItems: 'center',
						}}
					>
						{mainIconsHidden ? (
							<View
								style={{
									width: 35,
									height: 35,
									marginBottom: 2,
									backgroundColor: appColor.line_color,
									borderRadius: 50,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Icons.PlusIcon style={{ width: 25, height: 25 }} />
							</View>
						) : (
							<>
								<Icons.CameraIcon style={{ width: 35, height: 35 }} />
								<Icons.ImageIcon
									style={{ width: 25, height: 25, marginLeft: 10 }}
								/>
								<Icons.FolderIcon
									style={{ width: 25, height: 25, marginLeft: 15 }}
								/>
							</>
						)}
					</View>

					<View
						style={{
							flex: 1,
							flexShrink: 0,
							position: 'relative',
							justifyContent: 'flex-end',
						}}
					>
						<TextInput
							multiline
							onLayout={handleInputLayout}
							style={[
								styles.text_input,
								{
									borderWidth: 1,
									borderColor: appColor.line_color,
									color: appColor.inverseWhiteBlack,
								},
							]}
							placeholder='Message'
							placeholderTextColor={appColor.line_color}
							onChangeText={text => {
								if (text.length > 0) {
									setMainIconsHidden(true)
								} else {
									setMainIconsHidden(false)
								}
							}}
						/>

						<View
							style={{
								position: 'absolute',
								right: 10,
								opacity: 0.6,
								bottom: 10,
							}}
						>
							<Icons.MicIcon style={{ width: 25, height: 25 }} />
						</View>
					</View>
					<View style={{ flexShrink: 1, marginLeft: 20, marginBottom: 8 }}>
						{mainIconsHidden ? (
							<Icons.ArrowUpIcon style={{ width: 25, height: 25 }} />
						) : (
							<Icons.HeadsetIcon style={{ width: 25, height: 25 }} />
						)}
					</View>

					{showExpandBtn && (
						<Icons.ExpandIcon
							style={{
								width: 25,
								height: 25,
								position: 'absolute',
								top: 0,
								right: 20,
							}}
						/>
					)}
				</View>
			</View>
		</SafeAreaView>
	)
})

const styles = StyleSheet.create({
	text_input: {
		minHeight: 40,
		borderRadius: 20,
		width: '100%',
		paddingHorizontal: 14,
		fontSize: 20,
		maxHeight: 220,
	},
	text_box_container: {
		width: '100%',
		flexShrink: 0,
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		position: 'relative',
		overflow: 'hidden',
	},
})

export default ChatPage
