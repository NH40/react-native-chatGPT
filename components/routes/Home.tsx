import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, View } from 'react-native'

export const Home = React.memo((props: any) => {
	return (
		<View>
			<Text>Так попытка номер 3</Text>
			<StatusBar style='auto' />
		</View>
	)
})
