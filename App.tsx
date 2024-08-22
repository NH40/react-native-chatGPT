import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import RootComponent from './components/Root'
import { store } from './shared/rdx-store'

export default function App() {
	return (
		<Provider store={store}>
			<PaperProvider>
				<NavigationContainer>
					<RootComponent />
				</NavigationContainer>
			</PaperProvider>
		</Provider>
	)
}
