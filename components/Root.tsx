import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { Home } from './routes/Home'

const Stack = createStackNavigator()

const RootComponent = React.memo((props: any) => {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				// backgroundColor={backgroundStyle.backgroundColor}
			/>

			<Stack.Navigator>
				<Stack.Screen name='Home' component={Home} />
				{/* <Stack.Screen name='Notifications' component={} />
				<Stack.Screen name='Profile' component={} />
				<Stack.Screen name='Setting' component={} /> */}
			</Stack.Navigator>
		</>
	)
})

export default RootComponent
