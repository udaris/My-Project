import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../Firebase/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class FixturesListDemo extends React.Component {

    state = {
        fixtures: [],
        fixtureId: '',
        fixture: '',
        userRole: '',
        institute:'',
        sturucture:''
    }

    async componentDidMount() {

        let list = this.props.list;
        const Id = list.Id;
        const winner = list.winner;

        Firebase.database().ref('/fixtures/' + Id + '/fixtures')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    let p = [];

                    datasnapshot.forEach((child) => {


                        p.push({

                            fixture: child.val().fixture,
                            fixtureId: child.val().key,
                            date: child.val().date,
                            time: child.val().time,
                            location: child.val().location,
                            won: child.val().won

                        });

                    });
                    this.setState({ fixtures: p });
                });

            });

        Firebase.database().ref('users')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uuid = Firebase.auth().currentUser.uid;

                    datasnapshot.forEach((child) => {
                        if (child.val().uuid === uuid) {
                            this.setState({ userRole: child.val().userRole });

                        }
                    });
                });

            });

            Firebase.database().ref('teams')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    datasnapshot.forEach((child) => {
                        if (child.val().Name === winner) {
                            this.setState({ institute: child.val().InstituteName, sturucture:child.val().Structure });

                        }
                    });
                });

            });


    }

    deletefixture = Item => {
        let list = this.props.list;
        const Id = list.Id;
        Firebase.database()
            .ref('/fixtures/' + Id + '/fixtures/' + Item.fixtureId)
            .remove()
            .then(() => {

            }).catch(err => {
                console.log(err);
            })
        alert("Delete it!");
    };

  

    
    render() {

        const list = this.props.list;
        const name = list.Name;
        const winner = list.winner;
        const Id = list.Id;

        return (
            <View style={{ alignItems: 'center' }}>

                <View style={{ margin: 5, width: '89%' }}>


                    <LinearGradient colors={['turquoise', 'teal', 'antiquewhite']} >
                        <TouchableOpacity
                            style={[styles.listContainer]}>

                            <View style={{ height: 140 }}>
                                <Text style={{ fontSize: 20,fontFamily:'Lemon-Regular', color: 'white' }}>
                                    {name} </Text>

                                <Text style={{ margin: 5 }}>  </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginBottom: 10 }}> Winner Team : 
                                    <Text style={{color:'gold', fontSize:18,fontStyle:'italic', fontWeight:'bold'}}>  {winner}   </Text></Text>
                                <Icon name="trophy" size= {30} color='goldenrod' />
                                </View>
                                <View style={{height:10}}></View>
                                <Text style={{ marginBottom: 10 }}> Institute Name : <Text style={{fontSize:12,fontWeight:'bold',color:'darkgreen'}}> {this.state.institute} </Text></Text>
                                <Text style={{ marginBottom: 18 }}> Structure : <Text style={{fontSize:12,fontWeight:'bold',color:'darkgreen'}}> {this.state.sturucture} </Text></Text>
                           
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>

                    <Text style={{ fontSize: 16, margin: 10, fontWeight: 'bold' }}> Fixtures :</Text>


                    <FlatList
                        data={this.state.fixtures}
                        alwaysBounceVertical={false}
                        style={{ padding: 10 }}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (

                            <View style={{ marginBottom: 5, }}>

                                <LinearGradient colors={['turquoise', 'teal', 'antiquewhite']} >
                                    <View style={{ flexDirection: 'row', height: 35 }} >
                                        <TouchableOpacity >

                                            <Text style={{ fontSize: 18, marginLeft: 20 }} >
                                                {item.fixtureId}   {item.fixture}   </Text>

                                        </TouchableOpacity>

                                        {this.state.userRole == 'Admin' ?
                                            <TouchableOpacity onPress={() => this.deletefixture(item)}>
                                                <View style={{ marginLeft: 10 }}>
                                                    <Icon name="delete" color='#424242' size={18} style={{ margin: 2 }} /></View>
                                            </TouchableOpacity>
                                            : null}
                                    </View>

                                </LinearGradient>
                                <Text style={{ marginTop: 5 }}>Date: {item.date}</Text>
                                <Text >Location: {item.location}</Text>
                                <Text style={{ marginBottom: 6 }}>Won : {item.won}</Text>
                            </View>
                        )}
                    />


                </View>


            </View>

        )
    }


}

const styles = StyleSheet.create({
    title: {
        fontSize: 38,
        fontWeight: '800',
        color: 'red',
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: 'lightblue',
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 300

    },
    input: {
        borderWidth: 1,
        borderColor: 'orange',
        padding: 8,
        margin: 10,
        width: 150,
    },

    teambutton: {
        width: 180,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        flexDirection: 'row',
        margin: 5,
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todo: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16
    },
    infoBoxWrapper: {
        flexDirection: 'row',
        height: 60,
    },
    infoBox1: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBox2: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})