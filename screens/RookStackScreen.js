import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import ActorsScreen from './ActorsScreen';
import SignUpScreen1 from './SignUpScreen1.js';
import SignUpScreen2 from './SignUpScreen2.js';
import SignUpScreen3 from './SignUpScreen3.js';

import HomeScreen from './HomeScreen';
import TourlementForm1 from './TourlementForm1';

const RookStack=createStackNavigator();


const RookStackScreen =({navigation})=>{
return(
    <RookStack.Navigator screenOptions={{headerShown:false} } >
        <RookStack.Screen name ="Splash Screen" component={SplashScreen}/>
        <RookStack.Screen name="Sign IN" component={SignInScreen} />
        <RookStack.Screen name ="Actors" component={ActorsScreen}/>
        <RookStack.Screen name="Sign UP1" component={SignUpScreen1} />
        <RookStack.Screen name="Sign UP2" component={SignUpScreen2} />
        <RookStack.Screen name="Sign UP3" component={SignUpScreen3} />
        <RookStack.Screen name="Home3" component={HomeScreen} />
        <RookStack.Screen name="TourlementForm1" component={TourlementForm1} />
    </RookStack.Navigator>
);
};

export default RookStackScreen;

/*
 <RookStack.Screen name="ParentForm" component={ParentForm} />
        <RookStack.Screen name="PlayerForm" component={PlayerForm} />
        <RookStack.Screen name="CoachForm" component={CoachForm} />
          <RookStack.Screen name="HomeScreen" component={HomeScreen} />
        */
