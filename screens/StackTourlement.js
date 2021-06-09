import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import TourlementForm1 from './TourlementForm1';
import { NavigationContainer } from '@react-navigation/native';

const TourlStack=createStackNavigator();


const StackTourlement =({navigation})=>{
return(
<NavigationContainer>
    <TourlStack.Navigator screenOptions={{headerShown:false} } >
        <TourlStack.Screen name ="Home1" component={HomeScreen}/>
        <TourlStack.Screen name="TourlementForm1" component={TourlementForm1} />
    </TourlStack.Navigator>
    </NavigationContainer>
);
};

export default StackTourlement;

/*
 <RookStack.Screen name="ParentForm" component={ParentForm} />
        <RookStack.Screen name="PlayerForm" component={PlayerForm} />
        <RookStack.Screen name="CoachForm" component={CoachForm} />
          <RookStack.Screen name="HomeScreen" component={HomeScreen} />
        */
