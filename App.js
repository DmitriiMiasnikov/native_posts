import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { bootstrap } from './src/bootstrap';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './src/screens/MainScreen';
import { PostScreen } from './src/screens/PostScreen';
import { NavigationContainer } from '@react-navigation/native';
import {THEME} from './src/theme';

const Stack = createStackNavigator();
const styles = {
  headerStyle: {
    backgroundColor: THEME.MAIN_COLOR
  },
  headerTintColor: '#fff'
}
export default function App() {
  const [isReady, setIsReady] = useState(false)
  if (isReady) {
    return <AppLoading startAsync={bootstrap} onFinish={() => setIsReady(true)} onError={(err) => console.log(err)} />
  }
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Main' component={MainScreen} options={styles}/>
      <Stack.Screen name='Post' component={PostScreen} options={styles}/>
    </Stack.Navigator>
  </NavigationContainer>
}
