import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import { make_request } from '../../assets/constants'
import Icons from '../../assets/icons'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { updateMessages } from '../../shared/rdx-slice'
import { MessageBox } from '../../shared/reusables'
import { TMessage } from '../../shared/types'
import useAppColor from '../../themed/appColor'
import CustomView from '../../themed/CustomView'

const ChatPage = React.memo((props: any) => {
	const appColor = useAppColor()
	const dispatch = useAppDispatch()
	const conversation = useAppSelector(state => state.main.messages)
	const [prompt, setPrompt] = React.useState<string>('')
	const [mainIconsHidden, setMainIconsHidden] = React.useState<boolean>(false)
	const [showExpandBtn, setShowExpandBtn] = React.useState<boolean>(false)

	const handleSubmitPrompt = React.useCallback(() => {
		if (prompt.length === 0) return
		const message: TMessage = {
			content: prompt,
			sender: 'user',
		}
		dispatch(updateMessages(message))
		handlePromptChatGPT(prompt)
		setPrompt('')
	}, [prompt])

	const handlePromptChatGPT = React.useCallback(async (prompt: string) => {
		const response = await make_request(prompt)
		if (response == undefined) return console.log('error response')
		const message: TMessage = {
			content: response,
			sender: 'system',
		}
		dispatch(updateMessages(message))
	}, [])

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
				{conversation.length > 0 ? (
					<View style={{ flex: 1, flexShrink: 0, backgroundColor: 'green' }}>
						<CustomView style={{ paddingHorizontal: 20 }}>
							{conversation.map(message => (
								<MessageBox
									message={message.content}
									sender={message.sender}
									key={Math.random()}
								/>
							))}
						</CustomView>
					</View>
				) : (
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
							<Icons.OpenAIIcon mode='dark' style={{ width: 40, height: 40 }} />
						</View>
					</View>
				)}

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
							style={[
								styles.text_input,
								{
									borderWidth: 1,
									borderColor: appColor.line_color,
									color: appColor.inverseWhiteBlack,
								},
							]}
							placeholder='Сообщение'
							defaultValue={prompt}
							placeholderTextColor={appColor.line_color}
							onLayout={handleInputLayout}
							onChangeText={text => {
								if (text.length > 0) {
									setMainIconsHidden(true)
								} else {
									setMainIconsHidden(false)
								}
								setPrompt(text)
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
							<Icons.ArrowUpIcon
								style={{ width: 25, height: 25 }}
								onPress={handleSubmitPrompt}
							/>
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
