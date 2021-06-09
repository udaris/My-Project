import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../Firebase/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AddPlayers } from '../Firebase/Teams';


export default class TeamList extends React.Component {
    state = {
        players: [],
        playerId: '',
        playerName: '',
        userRole: '',
        validAdmin: false,
        erorAdmin: false,
        erorCoach: false,
        validCoach: false
    }

    async componentDidMount() {

        let list = this.props.list;
        const Id = list.Id;
        const InstituteId = list.InstituteId;
        const Coach = list.Coach;

        Firebase.database().ref('institutes')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uuid = Firebase.auth().currentUser.uid;

                    datasnapshot.forEach((child) => {
                        if (child.val().InstituteId === InstituteId) {
                            if (child.val().Aid === uuid) {
                                this.setState({ validAdmin: true });
                            }
                        }

                    });
                });

            });
        Firebase.database().ref('coaches')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uid = Firebase.auth().currentUser.uid;

                    datasnapshot.forEach((child) => {
                        if (child.val().FullName === Coach) {
                            if (child.val().uuid === uid) {
                                this.setState({ validCoach: true });
                            }
                        }

                    });
                });

            });

        Firebase.database().ref('/teams/' + Id + '/players')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    let p = [];

                    datasnapshot.forEach((child) => {
                        //console.log('player ' + child.val().playerName);

                        p.push({

                            playerName: child.val().playerName,
                            playerId: child.val().playerId,

                        });

                    });
                    this.setState({ players: p });
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


    }

    deleteplayer = Item => {
        let list = this.props.list;
        const Id = list.Id;
        if (this.state.validAdmin === true) {
            Firebase.database()
                .ref('/teams/' + Id + '/players/' + Item.playerId)
                .remove()
                .then(() => {
                    this.setState({ erorAdmin: false });
                }).catch(err => {
                    console.log(err);
                })
            alert("Delete it!");
        } else {
            if (this.state.validCoach === true) {
                Firebase.database()
                    .ref('/teams/' + Id + '/players/' + Item.playerId)
                    .remove()
                    .then(() => {
                        this.setState({ erorCoach: false });
                    }).catch(err => {
                        console.log(err);
                    })
                alert("Delete it!");
            } else {
                this.setState({ erorCoach: true });
            }
            this.setState({ erorAdmin: true });
        }
    };

    updatePlayer = Item => {
        this.setState({
            playerId: Item.playerId,
            playerName: Item.playerName
        });

    };

    AddPlayer = () => {
        let list = this.props.list;
        const Id = list.Id;
        AddPlayers(Id, this.state.playerName, this.state.playerId)
            .then(result => {
                this.setState({
                    playerId: '',
                    playerName: ''
                });
                alert("success")
            }).catch(err => {
                console.log(err);
            });


    }
    render() {

        const list = this.props.list;
        const name = list.Name;
        const sport = list.Sport;
        const Id = list.Id;
        const InstituteName = list.InstituteName;
        const InstituteId = list.InstituteId;
        return (
            <View style={{ alignItems: 'center' }}>

                <View style={{ margin: 5, width: '87%' }}>


                    <LinearGradient colors={['burlywood', 'orange', 'antiquewhite']} >
                        <TouchableOpacity
                            style={[styles.listContainer]}>

                            <View style={{ height: 120 }}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
                                    {name} </Text>

                                <Text style={{ margin: 5 }}>{sport}  </Text>

                                <Text style={{ marginBottom: 10 }}> Institute name : {InstituteName}</Text>
                                <Text style={{ marginBottom: 10 }}> Institute Id : {InstituteId}</Text>

                            </View>
                        </TouchableOpacity>
                    </LinearGradient>

                    <Text style={{ fontSize: 15, margin: 5 }}> Team players :</Text>


                    <FlatList
                        data={this.state.players}
                        alwaysBounceVertical={false}
                        style={{ padding: 10 }}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (

                            <View style={{ marginBottom: 5, }}>

                                <LinearGradient colors={['burlywood', 'orange', 'antiquewhite']} >
                                    <View style={{ flexDirection: 'row' }} >
                                        <TouchableOpacity onPress={() => this.updatePlayer(item)}>
                                            <View style={styles.infoBox2}>
                                                <Text style={{ fontSize: 18, marginLeft: 20 }} > {item.playerName}  </Text>
                                            </View>
                                        </TouchableOpacity>
                                        {this.state.userRole == 'Admin' ?
                                            <TouchableOpacity onPress={() => this.updatePlayer(item)} >

                                            </TouchableOpacity>
                                            : null}

                                        {this.state.userRole === 'Admin' || this.state.userRole === 'coach' ?
                                            <View>
                                                <TouchableOpacity onPress={() => this.deleteplayer(item)}>
                                                    <View style={styles.infoBox1}>
                                                        <Icon name="delete" size={20} color='grey' style={{ margin: 2 }} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            : null}
                                    </View>

                                </LinearGradient>
                            </View>
                        )}
                    />


                    {this.state.erorAdmin === true ? <Animatable.View animation="fadeInRight" duration={500}>
                        <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>You are not Admin in this institue.</Text>
                    </Animatable.View> : null}
                    {this.state.erorCoach === true ? <Animatable.View animation="fadeInRight" duration={500}>
                        <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>You are also not a coach Admin in this team.</Text>
                    </Animatable.View> : null}


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
        width: '100%',
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBox2: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})