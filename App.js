import React, { useEffect, useState } from 'react';
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
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Tabs = () => {
  const MainStyles = () => ({
    headerShown: false,
    tabBarLabel: 'Главная',
    tabBarIcon: ({ focused, color, size }) => {
      return <Ionicons name={'ios-albums'} size={25} color={color} />
    },
  })
  const BookedStyles = () => ({
    headerShown: false,
    tabBarLabel: 'Избранное',
    tabBarIcon: ({ focused, color, size }) => {
      return <Ionicons name={'ios-star'} size={25} color={color} />
    },
  })
  return (
    <Tab.Navigator
      tabBarOptions={{ activeTintColor: THEME.MAIN_COLOR, inactiveTintColor: 'grey', 
        activeBackgroundColor: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR }}>
      <Tab.Screen name='Main' component={MainScreen} options={MainStyles} />
      <Tab.Screen name='Booked' component={BookedScreen} options={BookedStyles} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();
export default function App() {
  const stylesMainPage = () => ({
    headerTitle: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take photo'} iconName={'ios-menu'} onPress={() => console.log('press photo')} />
        <Text style={styles.title}>Главная</Text>
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
  })
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
      <Tab.Screen name='Tab' component={Tabs} options={stylesMainPage} />
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