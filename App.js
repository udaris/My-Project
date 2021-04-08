/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Provider as PaperProvider, DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import { StyleSheet, View, Button, ActivityIndicator, } from 'react-native';

import TeamScreen from './screens/TeamScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import SurportScreen from './screens/SurportScreen';

import { AuthContext } from './components/context';
import RookStackScreen from './screens/RookStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StackTourlement from './screens/TourlementForm1';
import TourlementScreen from './screens/TourlementScreen';

import LottieView from 'lottie-react-native';

import MaintabsScreen from './screens/MaintabsScreen';
import { DrawerContent } from './screens/DrawerContent';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Drawer = createDrawerNavigator();

const App = () => {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  //const [isLoading, setIsLoading]=React.useState(true); 
  //const [userToken , setUserToken]=React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;



  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  0

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({

    signIn: async (foundUser) => {
      // setUserToken('fhjk');
      //setIsLoading(false);
      /*let userToken;
      userToken = null;
      if( userName == 'user' && password == 'pass' ){ 
        userToken = 'dfgdfg' ;
      }*/
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },

    signOut: async () => {
      //setUserToken(null);
      //setIsLoading(false);

      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },

    signUp: () => {
      // setUserToken('fhjk');
      //setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      //setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 4000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <ActivityIndicator size="large" />*/}
        <LottieView source={require('./assets/15519-ball.json')} autoPlay loop />
      </View>
    );
  }


  return (

    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme} >
        
          {loginState.userToken !== null ? (

            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}  >
              
              <Drawer.Screen name="My Sports" component={MaintabsScreen} options={{
                headerStyle: { backgroundColor: '#009387', elevation: 0 }
              }} />
              <Drawer.Screen name="Team" component={TeamScreen} />

              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen}
                options={{
                  headerStyle: { backgroundColor: '#009387', elevation: 0 },
                  headerTintColor: 'white',
                  headerTitleStyle: { fontWeight: 'bold', },
                }} />
              <Drawer.Screen name="SurportScreen" component={SurportScreen}
                options={{
                  headerStyle: { backgroundColor: '#009387', elevation: 0 },
                  headerTintColor: 'white',
                  headerTitleStyle: { fontWeight: 'bold', },
                }} />
            </Drawer.Navigator>
            
          )
            :
            
            <RookStackScreen />
          }
        
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: 'green',
  },
  container: {
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  infoBoxWrapper: {
    borderWidth: 1,
    borderColor: 'blue',
    flexDirection: 'row',
    height: 70,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;


