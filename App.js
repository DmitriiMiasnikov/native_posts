import React, { useState } from 'react';
import { Text, StyleSheet, Platform } from 'react-native'
import { AppLoading } from 'expo';
import { bootstrap } from './src/bootstrap';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './src/screens/MainScreen';
import { PostScreen } from './src/screens/PostScreen';
import { BookedScreen } from './src/screens/BookedScreen';
import { NavigationContainer } from '@react-navigation/native';
import { THEME } from './src/theme';
import { AppHeaderIcon } from './src/components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Tabs = () => {
  const stylesMainPage = ({ route }) => ({
    headerShown: false,
    tabBarName: 'Main',
    tabBarIcon: ({ focused, color, size }) => {
      return <Ionicons name={route.name === 'Main' ? 'ios-albums' : 'ios-menu'} size={25} color={color}/>
    },
  })
  return (
    <Tab.Navigator screenOptions={stylesMainPage} 
      tabBarOptions={{activeTintColor: THEME.MAIN_COLOR, inactiveTintColor: 'grey' }}>
      <Tab.Screen name='Main' component={MainScreen}/>
      <Tab.Screen name='Booked' component={BookedScreen}/>
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();
export default function App() {
  const stylesMainPage = {
    headerTitle: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take photo'} iconName={'ios-menu'} onPress={() => console.log('press photo')} />
        <Text style={styles.title}>Main page</Text>
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take photo'} iconName={'ios-camera'} onPress={() => console.log('press photo')} />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
  }
  const stylesPostPage = ({ route }) => ({
    headerTitle: `Пост от ${new Date(route.params.date).toLocaleDateString()}`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take photo'} iconName={route.params.booked ? 'ios-star' : 'ios-star-outline'}
          onPress={() => console.log('press photo')} />
      </HeaderButtons>
    ),
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
      <Stack.Screen name='Tab' component={Tabs} options={stylesMainPage}/>
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