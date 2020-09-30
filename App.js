import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { bootstrap } from './src/bootstrap';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './src/screens/MainScreen';
import { PostScreen } from './src/screens/PostScreen';
import { NavigationContainer } from '@react-navigation/native';
import {THEME} from './src/theme';

const Stack = createStackNavigator();

export default function App() {
  const stylesMainPage = {
    headerTitle: 'Main page',
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
  }
  const stylesPostPage = ({route}) => ({
    headerTitle: `Пост от ${new Date(route.params.date).toLocaleDateString()}`,
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
  })
  const [isReady, setIsReady] = useState(false)
  if (isReady) {
    return <AppLoading startAsync={bootstrap} onFinish={() => setIsReady(true)} onError={(err) => console.log(err)} />
  }
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Main' component={MainScreen} options={stylesMainPage}/>
      <Stack.Screen name='Post' component={PostScreen} options={stylesPostPage}/>
    </Stack.Navigator>
  </NavigationContainer>
}
