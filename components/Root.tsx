import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { Home } from './routes/Home'
import SettingsRoute from './routes/Settings'

const Stack = createStackNavigator()

const RootComponent = React.memo((props: any) => {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Настройки'
					options={{
						presentation: 'modal',
						headerShadowVisible: false,
					}}
					component={SettingsRoute}
				/>
			</Stack.Navigator>
		</>
	)
})

export default RootComponent
