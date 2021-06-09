import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
    FlatList, ScrollView, Dimensions, StatusBar, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../Firebase/firebaseConfig';
import { submitTeam, AddPlayers } from '../Firebase/Teams';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FixturesListDemo from './FixturesListDemo';


export default class FixturesList extends React.Component {

    state = {
        allUsers: [],
        players: [],
    }

    async componentDidMount() {
        Firebase.database().ref('/fixtures')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    let usersall = [];

                    datasnapshot.forEach((child) => {

                        usersall.push({
                            Name: child.val().TourlementName,
                            Id: child.val().Id,
                            winner:child.val().winner             
                           
                        });

                    });
                    this.setState({ allUsers: usersall });
                });

            });

           

       


    }
   
    renderList = list => {
        return <FixturesListDemo list={list} />;
    }


    render() {
        return (
            <View>
                <Text style={{ fontSize: 19,fontStyle:'italic', left:10,color:'darkgreen', fontWeight:'bold', marginBottom: 18 ,marginTop:10}}>Tourlement with Fixtures details </Text>
                <View style={{justifyContent:'center'}} >
                    <FlatList
                        alwaysBounceVertical={false}
                        data={this.state.allUsers}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => this.renderList(item)}

                        keyboardShouldPersistTaps="always"
                    />

                 

                </View>



            </View>
        )
    }

}