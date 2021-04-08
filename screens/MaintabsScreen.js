import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme, Avatar } from 'react-native-paper';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import NotificationScreen from './NotificationScren';
import ProfileScreen from './ProfileScreen';
import TeamScreen from './TeamScreen';
import SettingsScreen from './SettingsScreen';
import TourlementScreen from './TourlementScreen';
import { View } from 'react-native';
import { styles } from './ActorsScreen';

import TourlementForm1 from './TourlementForm1';
const stack2=createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const TeamStack = createStackNavigator();
const SettingStack = createStackNavigator();
const NotificationStack = createStackNavigator();



const MaintabsScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{
        backgroundColor: 'green', position: 'absolute',
        bottom: 22, left: 20, right: 20, elevation: 0,
        borderRadius: 15, shadowColor: '#7F5DF0',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.30, shadowRadius: 3.5, elevation:5
      }}

    >
      <Tab.Screen
        name="home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#00ced1',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />


      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#66cdaa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Team"
        component={TeamStackScreen}
        options={{
          tabBarLabel: 'Team',
          tabBarColor: '#4682b4',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={26} />
          ),
        }}
      />



      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#808080',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="select" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarColor: '#808080',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />


    </Tab.Navigator>
  );
}

export default MaintabsScreen;



const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle:
    {
      backgroundColor: 'lightblue',
      elevation: 0
    },
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold', },
  }}>

    <HomeStack.Screen name="Home"
      component={HomeScreen} options={{
        title: 'Overview',
        headerRight: () => (
          <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <Icon.Button
              name="ios-search"
              size={25}
              color="white"
              backgroundColor="grey"
              onPress={() => { }}
            />
            <TouchableOpacity
              style={{ paddingHorizontal: 10, marginTop: 5 }}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Avatar.Image
                source={require('../assets/logo.jpg')}
                /* source={{ url:'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png'}},*/
                size={30}
              />
            </TouchableOpacity>
          </View>
        ),
        tabBarLabel: 'Home!',
      }} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator screenOptions={{
    headerStyle: { backgroundColor: 'lightblue', elevation: 0, },
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold', },
  }} >
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const tScreen = ({ navigation }) => (
  <Stack3.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: 'lightblue', elevation: 0 },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold', },
    }}>
    <Stack3.Screen name="Team" component={TourlementForm1} />
  </Stack3.Navigator>
);

const TeamStackScreen = ({ navigation }) => (
  <TeamStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: 'lightblue', elevation: 0 },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold', },
    }}>
    <TeamStack.Screen name="Team" component={TeamScreen} />
  </TeamStack.Navigator>
);
const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator screenOptions={{
    headerStyle: { backgroundColor: 'lightblue', elevation: 0 },
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold', },
  }} >
    <NotificationStack.Screen name="Notifications" component={NotificationScreen} />
  </NotificationStack.Navigator>
);

const SettingsStackScreen = ({ navigation }) => (
  <SettingStack.Navigator screenOptions={{
    headerStyle: { backgroundColor: 'lightblue', elevation: 0 },
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold', },
  }} >
    <SettingStack.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings!' }} />
  </SettingStack.Navigator>
);
