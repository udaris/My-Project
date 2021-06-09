import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Modal, FlatList,
    ScrollView, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../Firebase/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateFixtures, AddFixtures, updateWinners } from '../Firebase/submitFixtures';
import FixturesList from './FixturesList';


const GetFixtures = () => {



    const deleteTourlements = Item => {
        Firebase.database()
            .ref('fixtures/' + Item.Id)
            .remove()
            .then(() => {

            }).catch(err => {
                console.log(err);
            })
        alert("Delete it!");
    };

    const [Id, setId] = React.useState();
    const [TourlementName, setTourlementName] = React.useState();
    const [ongoing, setOngoing] = React.useState();
    const [remaining, setRemaining] = React.useState();
    const [completed, setCompleted] = React.useState();
    const [color, setColor] = React.useState();

    const [winner, setWinner] = React.useState();

    const Updatewinner = () => {
        updateWinners(Id, '', winner)
            .then(result => {
                setWinner('');
            }).catch(err => {
                console.log(err);
            });

    }
    const UpdateSummary = () => {
        updateFixtures(Id, '',
            TourlementName, ongoing, remaining,
            completed, color, '')
            .then(result => {


            }).catch(err => {
                console.log(err);
            });

    }

    const updateTourlements = Item => {
        setId(Item.Id);
        setTourlementName(Item.TourlementName);
        setOngoing(Item.ongoing);
        setRemaining(Item.remaining);
        setCompleted(Item.completed);
        setColor(Item.color);
        setFixture(Item.fixture)

    };
    const ResetTourlements = () => {
        setId(null);
        setTourlementName('');
        setOngoing('');
        setRemaining('');
        setCompleted('');
        setColor('');
        setFixture('')

    };


    const [strucutre, setStructure] = React.useState({
        allUser: []
    });

    React.useEffect(() => {
        Firebase.database().ref('/fixtures')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    let usersall = [];
                    let fixtures = [];

                    datasnapshot.forEach((child) => {

                        usersall.push({
                            TourlementName: child.val().TourlementName,
                            Id: child.val().Id,
                            ongoing: child.val().ongoing,
                            remaining: child.val().remaining,
                            completed: child.val().completed,
                            color: child.val().color,
                            winner: child.val().winner

                        });

                    });
                    setStructure({ allUser: usersall, fixture: fixtures });
                });

            });


    }, []);


    const [usertype, setUserType] = React.useState({
        userRole: 'user'
    });

    React.useEffect(() => {
        Firebase.database().ref('users')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uuid = Firebase.auth().currentUser.uid;

                    datasnapshot.forEach((child) => {
                        if (child.val().uuid === uuid) {
                            setUserType({ userRole: child.val().userRole });

                        }
                    });
                });

            });

    }, []);



    const addFixtures = () => {
        if (Id != null) {
            if (fixture.length > 5 && date.length > 5 && time.length > 3 && locatin.length > 5) {
                AddFixtures(Id, key, fixture, date, time, locatin, won)
                    .then(result => {
                        setkey('');
                        setdate('');
                        setTime('');
                        setFixture('');
                        setlocatin('');
                        setwon('');
                        alert("success added!")
                    }).catch(error => {
                        console.log(error);
                    })
            } else {
                alert('Not valid entered');
            }
        }else{
            alert("you first touch an edit icon in a tourlement.")
        }
    }

    const [fixture, setFixture] = React.useState([]);
    const [key, setkey] = React.useState([]);
    const [date, setdate] = React.useState([]);
    const [time, setTime] = React.useState([]);
    const [locatin, setlocatin] = React.useState([]);
    const [won, setwon] = React.useState([]);

    return (
        <View style={{ marginTop: 10 }}>

            <ScrollView horizontal={true}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 1, marginTop: 20 }}>


                    <FlatList
                        alwaysBounceVertical={false}
                        data={strucutre.allUser}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (

                            <View style={{ alignItems: 'center' }}>

                                <TouchableOpacity
                                    style={[styles.listContainer, { backgroundColor: item.color, marginTop: 15 }]} >
                                    <Text style={[styles.listtitle, { fontFamily: 'Lemon-Regular' }]} numberOfLines={1}>
                                        {item.TourlementName}
                                    </Text>
                                    <View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Lemon-Regular' }} >  {item.ongoing} </Text>
                                            <Text style={{ fontFamily: 'Lemon-Regular' }}>Ongoing Fixtures</Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Lemon-Regular' }}> {item.remaining}</Text>
                                            <Text style={{ fontFamily: 'Lemon-Regular' }}>Remaining Fixtures</Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Lemon-Regular' }}> {item.completed}</Text>
                                            <Text style={{ fontFamily: 'Lemon-Regular' }}>Completed Fixtures</Text>
                                            <Text>{item.fixture}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            {usertype.userRole === 'Admin' ?
                                                <TouchableOpacity onPress={() => deleteTourlements(item)} style={{ right: 55, marginTop: 9 }} >
                                                    <Icon name="delete" color="#777777" size={30} />
                                                </TouchableOpacity> : null}
                                            {usertype.userRole === 'Admin' ?
                                                <TouchableOpacity onPress={() => updateTourlements(item)} style={{ right: 20, marginTop: 9 }}>
                                                    <Icon name="pencil-outline" color="#777777" size={30} />
                                                </TouchableOpacity> : null}
                                        </View>

                                    </View>
                                </TouchableOpacity>

                            </View>
                        )} />


                </View>
            </ScrollView>

            {usertype.userRole === 'Admin' ?

            <View style={[styles.infoBoxWrapper, { marginTop: 19 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={styles.textinput}> Ongoing : </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder="Number of ongoing "
                        value={ongoing} keyboardType='numeric'
                        onChangeText={(text) => setOngoing(text)}
                    />
                </View>
            </View>:null}
            {usertype.userRole === 'Admin' ?
            <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={styles.textinput}> Remaining : </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder="Number of remaining "
                        value={remaining} keyboardType='numeric' onChangeText={(text) => setRemaining(text)}
                    />
                </View>
            </View>:null}
            {usertype.userRole === 'Admin' ?
            <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={styles.textinput}> Completed : </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder="Number of complet"
                        value={completed} keyboardType='numeric' onChangeText={(text) => setCompleted(text)}
                    />
                </View>
            </View>:null}

            {usertype.userRole === 'Admin' ?
                <TouchableOpacity onPress={() => UpdateSummary()}  >
                    <LinearGradient colors={['#01579B', 'antiquewhite']}
                        style={[styles.teambutton, { marginTop: 12, marginBottom: 12 }]}   >
                        <Text> Update summary </Text>
                    </LinearGradient>
                </TouchableOpacity>
                :
                <TouchableOpacity >
                    <LinearGradient colors={['#01579B', 'antiquewhite']}
                        style={[styles.teambutton, { marginTop: 12, marginBottom: 12 }]}   >
                        <Text> Update summary </Text>
                    </LinearGradient>
                </TouchableOpacity>
            }

            <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={styles.textinput}> Fixtures : </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder="Royal Vs BigBang"
                        value={fixture}
                        onChangeText={(text) => setFixture(text)}
                    />
                </View>
            </View>

            <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={styles.textinput}> key : </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder=" 1 "
                        value={key} keyboardType='numeric'
                        onChangeText={(text) => setkey(text)}
                    />
                </View>
            </View>

            <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={styles.textinput}> Date : </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder="19/01/2020"
                        value={date} keyboardType='numeric'
                        onChangeText={(text) => setdate(text)}
                    />
                </View>
            </View>

            <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={styles.textinput}> Time </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder="9. 00 am"
                        value={time}
                        onChangeText={(text) => setTime(text)}
                    />
                </View>
            </View>

            <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={styles.textinput}> Location </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder="Galle beach"
                        value={locatin}
                        onChangeText={(text) => setlocatin(text)}
                    />
                </View>
            </View>

            <View style={[styles.infoBoxWrapper, { marginTop: 1 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={styles.textinput}> winner </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder="not yet/ ongoing"
                        value={won}
                        onChangeText={(text) => setwon(text)}
                    />
                </View>
            </View>
            {usertype.userRole === 'Admin' ?
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => addFixtures()}  >
                        <LinearGradient colors={['#1E88E5', 'antiquewhite']} style={styles.teambutton}  >
                            <Text> Add Fixture</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity   >
                        <LinearGradient colors={['#1E88E5', 'antiquewhite']} style={styles.teambutton}  >
                            <Text> Add Fixture</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            }

            <Text style={{ color: 'darkgoldenrod', marginTop: 20, fontStyle: 'italic', fontSize: 18 }}> Who are the champions of the tournament?</Text>
            <View style={[styles.infoBoxWrapper, { marginTop: 10 }]}>
                <View style={[styles.infoBox1,]}>
                    <Text style={[styles.textinput, { color: 'brown', fontWeight: 'bold' }]}> Champions in Tourlement </Text>
                </View>
                <View style={styles.infoBox2}>
                    <TextInput style={styles.input} placeholder="winner team name"
                        value={winner} onChangeText={(text) => setWinner(text)}
                    />
                </View>
            </View>

            {usertype.userRole === 'Admin' ?
                <TouchableOpacity onPress={() => Updatewinner()}  >
                    <LinearGradient colors={['gold', 'antiquewhite']}
                        style={[styles.teambutton, { marginTop: 12, marginBottom: 10 }]}  >
                        <Text> Update winners </Text>
                    </LinearGradient>
                </TouchableOpacity>
                :
                <TouchableOpacity >
                    <LinearGradient colors={['gold', 'antiquewhite']}
                        style={[styles.teambutton, { marginTop: 12, marginBottom: 10 }]}  >
                        <Text> Update winners </Text>
                    </LinearGradient>
                </TouchableOpacity>
            }


            {usertype.userRole === 'Admin' ?
                <TouchableOpacity style={{ marginTop: 10, marginBottom: 20 }} onPress={() => ResetTourlements()}  >
                    <LinearGradient colors={['#0091EA','lightcyan']}
                        style={[styles.teambutton, { marginTop: 12, marginBottom: 18 }]}   >
                        <Text> Reset </Text>
                    </LinearGradient>
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ marginTop: 10, marginBottom: 20 }} onPress={() => ResetTourlements()}  >
                    <LinearGradient colors={['darkkhaki', 'lightcyan']} style={styles.teambutton}  >
                        <Text> Reset </Text>
                    </LinearGradient>
                </TouchableOpacity>}

            <View>

                <FixturesList />
            </View>


        </View>



    )
}

export default GetFixtures;


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
        width: 180,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        flexDirection: 'row',
        margin: 5,
    },
    listtitle: {
        fontSize: 24,
        color: 'white',
        marginBottom: 18
    },


});
