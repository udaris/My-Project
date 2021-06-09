import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Modal, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../Firebase/firebaseConfig';
import { submitFixtures } from '../Firebase/submitFixtures';
import GetFixtures from './GetFixtures';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Fixtures extends React.Component {

    backgroundColor = ["yellow", "chartreuse", "blueviolet", "deeppink", "darkslateblue", 'pink', 'purple', 'green', 'red', 'mediumvioletred', 'darkblue'];

    state = {
        id: '',
        tourlementName: '',
        ongoing: '',
        remaining: '',
        completed: '',
        fixtures: '',
        allUsers: [],
        addTodoVisible: false,
        color: this.backgroundColor[0],
        userRole: 'user',


    };


    renderColor() {
        return this.backgroundColor.map(color => {
            return (
                <TouchableOpacity key={color} style={[styles.colorSelect,
                { backgroundColor: color }]}
                    onPress={() => this.setState({ color })} />
            )
        })

    }



    async componentDidMount() {

        Firebase.database().ref('/tourelements')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uuid = Firebase.auth().currentUser.uid;

                    let usersall = [];

                    datasnapshot.forEach((child) => {

                        usersall.push({
                            tourlementsName: child.val().TourlementName,
                            tourlementStatus: child.val().Status,
                            tourlementSport: child.val().Sport,
                            tourlementId: child.val().Id
                        });

                    });
                    this.setState({ allUsers: usersall });
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

    SubmitFixturesShedule = () => {
      
            submitFixtures(this.state.id, '',
                this.state.tourlementName,
                this.state.ongoing, this.state.remaining,
                this.state.completed, this.state.color,'')
                .then(result => {
                    this.setState({
                        tourlementName: '',
                        id: '',
                        ongoing: '',
                        remaining: '',
                        completed: '',

                    })
                    alert("Success")
                }).catch(err => {
                    console.log(err);
                });
      

    }

    updateTourlement = Item => {
        this.setState({
            tourlementName: Item.tourlementsName,
            id: Item.tourlementId
        })

    };

    render() {


        return (
            <View>

                <Text style={{ fontSize: 25, color: 'black', fontFamily:'Lemon-Regular' }} >Fixtures</Text>


                <View>
                    <FlatList
                        alwaysBounceVertical={false}
                        data={this.state.allUsers}
                        style={{ padding: 20 }}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={{ alignItems: 'center', margin: 10 }}>
                                <LinearGradient colors={['#880E4F', 'lightpink', '#F06292']} >
                                    <TouchableOpacity
                                        style={[styles.listContainer, { marginTop: 5, }]} >

                                        <Text style={[styles.listtitle,{fontFamily:'Lemon-Regular'}]} numberOfLines={1}>
                                            {item.tourlementsName}
                                        </Text>

                                        <View>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontSize: 20, fontFamily:'Lemon-Regular', marginBottom: 10 }}>
                                                    {item.tourlementStatus} </Text>
                                            </View>

                                            {this.state.userRole === 'Admin' ?
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 18, marginBottom: 10 }} >{item.tourlementId} </Text>
                                                </View>
                                                : <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 18, marginBottom: 10 }} > </Text>
                                                </View>}

                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontSize: 18, marginBottom: 10,fontFamily:'Lemon-Regular' }}> {item.tourlementSport}</Text>
                                            </View>

                                            {this.state.userRole === 'Admin' ?
                                                <View style={{}}>
                                                    <TouchableOpacity onPress={() => this.updateTourlement(item)}>
                                                        <Icon name="pencil-outline" color="#777777" size={30} />
                                                    </TouchableOpacity>
                                                </View>
                                                : null}
                                        </View>

                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        )} />

                    <SafeAreaView>
                        {this.state.userRole === 'Admin' ?
                            <View>
                                <View style={[styles.infoBoxWrapper, { marginTop: 10 }]}>
                                    <View style={[styles.infoBox1,]}>
                                        <Text style={styles.textinput}>Tourlement Name : </Text>
                                    </View>
                                    <View style={styles.infoBox2}>
                                        <TextInput style={styles.input} placeholder="2020 Xxxxx"
                                            value={this.state.tourlementName}
                                            onChangeText={(text) => this.setState({ tourlementName: text })} />
                                    </View>
                                </View>
                                <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                                    <View style={[styles.infoBox1,]}>
                                        <Text style={styles.textinput}> Tourlement Token </Text>
                                    </View>
                                    <View style={styles.infoBox2}>
                                        <TextInput style={styles.input} placeholder=" Token "
                                            value={this.state.id}
                                            onChangeText={(text) => this.setState({ id: text })}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                                    <View style={[styles.infoBox1,]}>
                                        <Text style={styles.textinput}> Ongoing Fixtures </Text>
                                    </View>
                                    <View style={styles.infoBox2}>
                                        <TextInput style={styles.input} placeholder="No. of ongoing fixtures"
                                        keyboardType='numeric'
                                            value={this.state.ongoing}
                                            onChangeText={(text) => this.setState({ ongoing: text })}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                                    <View style={[styles.infoBox1,]}>
                                        <Text style={styles.textinput}> Remaining Fixtures </Text>
                                    </View>
                                    <View style={styles.infoBox2}>
                                        <TextInput style={styles.input} placeholder="No. of remaining fixtures"
                                            value={this.state.remaining}  keyboardType='numeric'
                                            onChangeText={(text) => this.setState({ remaining: text })}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                                    <View style={[styles.infoBox1,]}>
                                        <Text style={styles.textinput}> Completed Fixtures </Text>
                                    </View>
                                    <View style={styles.infoBox2}>
                                        <TextInput style={styles.input} placeholder="No. of completed fixtures"
                                            value={this.state.completed}  keyboardType='numeric'
                                            onChangeText={(text) => this.setState({ completed: text })}
                                        />
                                    </View>
                                </View>



                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 13 }} >
                                    {this.renderColor()}
                                </View>
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <View style={styles.infoBox1}>
                                        <TouchableOpacity onPress={() => this.SubmitFixturesShedule()}  >
                                            <LinearGradient colors={['#FFCC80', '#5C6BC0']} style={styles.teambutton}  >
                                                <Text> Create a shedule</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.infoBox1, { borderRadius: 70, marginTop: 10, left: 150, backgroundColor: this.state.color, height: 40, width: 50 }]}></View>
                                </View>

                            </View>
                            : null}

                        <GetFixtures />

                    </SafeAreaView>
                </View>
            </View>
        )
    }

}



const styles = StyleSheet.create({
    infoBox2: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    infoBox1: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBoxWrapper: {
        flexDirection: 'row',
        height: 60,
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
        borderColor: 'darksalmon',
        padding: 8,
        margin: 10,
        width: 150,
    },

    teambutton: {
        width: 160,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        flexDirection: 'row',
        margin: 5,
    },
    listtitle: {
        fontSize: 15,
        color: 'white',
        marginBottom: 18
    },
    colorSelect: {
        width: 30,
        height: 35,
        borderRadius: 4
    }
});