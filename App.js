import React, { useState } from 'react';
import { Text, StyleSheet, Platform } from 'react-native'
import { AppLoading } from 'expo';
import { bootstrap } from './src/bootstrap';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './src/screens/MainScreen';
import { PostScreen } from './src/screens/PostScreen';
import { NavigationContainer } from '@react-navigation/native';
import { THEME } from './src/theme';
import { AppHeaderIcon } from './src/components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

const Stack = createStackNavigator();

export default function App() {
  const stylesMainPage = {
    headerTitle: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take photo'} iconName={'ios-camera'} onPress={() => console.log('press photo')} />
        <Text style={styles.title}>Main page</Text>
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take photo'} iconName={'ios-camera'} onPress={() => console.log('press photo')} />
      </HeaderButtons>
    ),
    // headerTitle: 'Main page',
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
  }
  const stylesPostPage = ({ route }) => ({
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
      <Stack.Screen name='Main' component={MainScreen} options={stylesMainPage} />
      <Stack.Screen name='Post' component={PostScreen} options={stylesPostPage} />
    </Stack.Navigator>
  </NavigationContainer>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR
  }
})