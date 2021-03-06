import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Platform } from 'react-native'
import { AppLoading } from 'expo';
import { bootstrap } from './src/bootstrap';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './src/screens/MainScreen';
import { PostScreen } from './src/screens/PostScreen';
import { BookedScreen } from './src/screens/BookedScreen';
import { AboutScreen } from './src/screens/AboutScreen';
import { CreateScreen } from './src/screens/CreateScreen';
import { DrawerActions, getFocusedRouteNameFromRoute, NavigationContainer, useRoute } from '@react-navigation/native';
import { THEME } from './src/theme';
import { AppHeaderIcon } from './src/components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import store from './src/store/index'

const getTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Main';
  switch (routeName) {
    case 'Main':
      return 'Главная';
    case 'Booked':
      return 'Избранное';
    case 'Create':
      return 'Создать пост';
    case 'About':
      return 'О приложении';
  }
}

const Drawer = createDrawerNavigator();

const Drawers = () => {
  const tabPostStyles = ({
    title: 'Главная страница',
    drawerIcon: ({ focused, color, size }) => {
      return <Ionicons name={'ios-star'} size={25} color={color} />
    },
  })
  const aboutStyles = ({
    title: 'О приложении'
  })
  const createStyles = ({
    title: 'Создать пост'
  })
  return (
    <Drawer.Navigator drawerOptions={{
      activeTintColor: THEME.MAIN_COLOR, inactiveTintColor: 'grey',
      activeBackgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white',
    }}>
      <Drawer.Screen name='Main' component={Tabs} options={tabPostStyles} />
      <Drawer.Screen name='About' component={AboutScreen} options={aboutStyles} />
      <Drawer.Screen name='Create' component={CreateScreen} options={createStyles} />
    </Drawer.Navigator>
  )
}

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Tabs = () => {
  const MainStyles = () => ({
    tabBarLabel: 'Главная',
    tabBarIcon: ({ focused, color, size }) => {
      return <Ionicons name={'ios-albums'} size={25} color={color} />
    },
  })
  const BookedStyles = () => ({
    tabBarLabel: 'Избранное',
    tabBarIcon: ({ focused, color, size }) => {
      return <Ionicons name={'ios-star'} size={25} color={color} />
    },
  })
  return (
    <Tab.Navigator shifting={true}
      tabBarOptions={{
        activeTintColor: THEME.MAIN_COLOR, inactiveTintColor: 'grey',
        activeBackgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white'
      }}>
      <Tab.Screen name='Main' component={MainScreen} options={MainStyles} />
      <Tab.Screen name='Booked' component={BookedScreen} options={BookedStyles} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();
export default function App() {
  // const dispatch = useDispatch()
  const stylesMainPage = ({ navigation, route }) => ({
    headerTitle: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take photo'} iconName={'ios-menu'} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        <Text style={styles.title}>{getTitle(route)}</Text>
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take photo'} iconName={'ios-camera'} onPress={() => navigation.navigate('Create')} />
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
          onPress={() => route.params.toggleHandler} />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
  })
  const [isReady, setIsReady] = useState(false)
  if (!isReady) {
    return <AppLoading startAsync={bootstrap} onFinish={() => setIsReady(true)} onError={(err) => console.log(err)} />
  }
  return <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Drawers' component={Drawers} options={stylesMainPage} />
        <Stack.Screen name='Tabs' component={Tabs} />
        <Stack.Screen name='Main' component={MainScreen} options={stylesMainPage}/>
        <Stack.Screen name='Booked' component={BookedScreen} />
        <Stack.Screen name='Post' component={PostScreen} options={stylesPostPage} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR
  }
})