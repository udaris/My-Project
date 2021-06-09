import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
    FlatList, ScrollView, Dimensions, StatusBar, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../Firebase/firebaseConfig';
import { submitTeam, AddPlayers } from '../Firebase/Teams';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TeamList from './TeamList';


export default class Team extends React.Component {

    state = {
        allUsers: [],
        players: [],
    }

    async componentDidMount() {
        Firebase.database().ref('/teams')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    let usersall = [];

                    datasnapshot.forEach((child) => {

                        usersall.push({
                            Name: child.val().Name,
                            Coach: child.val().Coach,
                            Sport: child.val().Sport,
                            Structure: child.val().Structure,
                            Id: child.val().Id,
                            InstituteName:child.val().InstituteName,
                            InstituteId:child.val().InstituteId,
                            players:child.val().players
                           
                        });

                    });
                    this.setState({ allUsers: usersall });
                });

            });

           

       


    }
   
    renderList = list => {
        return <TeamList list={list} />;
    }


    render() {
        return (
            <View>
                <Text style={{ fontSize: 17,left:10, marginBottom: 12 ,marginTop:13}}>Teams with Institutes details </Text>
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