import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
//@ts-ignore
import Icons from '../../assets/icons'
import useAppColor from '../../themed/appColor'
import ChatPage from '../sub-routes/ChatPage'
import ExplorePage from '../sub-routes/ExplorePage'

const Driver = createDrawerNavigator()

export const Home = React.memo((props: any) => {
	const appColor = useAppColor()

	return (
		<Driver.Navigator
			drawerContent={props => {
				return (
					<SafeAreaView style={{ flex: 1 }}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								position: 'relative',
								alignItems: 'center',
							}}
						>
							<TextInput
								style={[
									styles.search_box,
									{
										backgroundColor: appColor.search_box,
										color: appColor.text_color,
									},
								]}
								placeholder='Поиск'
							/>
							<View style={{ position: 'absolute', left: 18, opacity: 0.5 }}>
								<Icons.SearchIcon style={{ width: 25, height: 25 }} />
							</View>
						</View>
						<ScrollView style={{ flex: 1 }}>
							<DrawerItem
								focused={true}
								activeTintColor={appColor.bold_text}
								activeBackgroundColor={appColor.highlight_bg}
								onPress={() => props.navigation.navigate('ChatPage')}
								label={'ChatGPT'}
								icon={() => (
									<View>
										<Icons.OpenAIIcon />
									</View>
								)}
							/>
							<DrawerItem
								activeTintColor={appColor.bold_text}
								activeBackgroundColor={appColor.highlight_bg}
								icon={() => (
									<View>
										<Icons.MenuCircleIcon />
									</View>
								)}
								onPress={() => props.navigation.navigate('ExplorePage')}
								label={'ExplorePage'}
							/>
						</ScrollView>
					</SafeAreaView>
				)
			}}
		>
			<Driver.Screen name='ChatPage' component={ChatPage} />
			<Driver.Screen name='ExplorePage' component={ExplorePage} />
		</Driver.Navigator>
	)
})

const styles = StyleSheet.create({
	search_box: {
		width: '95%',
		height: 50,
		// backgroundColor: appColor.search_box,
		borderRadius: 13,
		padding: 15,
		fontSize: 15,
		paddingLeft: 40,
	},
})
