import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
    FlatList, ScrollView, Dimensions, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import Firebase from '../Firebase/firebaseConfig';
import * as Animatable from 'react-native-animatable';
import { submitTeam, AddPlayers, submiInstitute } from '../Firebase/Teams';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Team from './Team';

const FormTeam = () => {


    const { colors } = useTheme();
    const theme = useTheme();

    const [instituteName, setInstituteName] = React.useState();
    const [instituteId, setInstituteId] = React.useState();
    const [AdminId, setAdminId] = React.useState();

    const AddInstitute = () => {
        if (AdminId) {

        } else {
            if (instituteId && instituteName) {
                if (instituteName.length > 5 && instituteId.length > 4) {
                    submiInstitute('', instituteName, instituteId)
                        .then(result => {
                            setInstituteName('');
                            setInstituteId('');
                            setEr({ error2: false, errori: false });
                            alert("welcome !")
                        }).catch(err => {
                            console.log(err);
                        });
                } else {
                    setEr({ errori: true });
                }

            } else { }

        }
    }

    const UpdateInstituteButton = () => {
        if (AdminId) {
            if (Er.valid === true) {
                if (instituteId && instituteName) {
                    if (instituteName.length > 5 && instituteId.length > 4) {
                        submiInstitute('', instituteName, instituteId)
                            .then(result => {
                                setInstituteName('');
                                setInstituteId('');
                                setEr({ errordeletein: false });
                                setEr({ error2: false, errori: false });
                                alert("welcome !")
                            }).catch(err => {
                                console.log(err);
                            });
                    } else {
                        setEr({ errori: true });
                    }

                } else {

                }
            } else {
                setEr({ errordeletein: true });
            }
        } else {

        }
    }

    const ResetInstitute = () => {
        setInstituteName('');
        setInstituteId('');
        setAdminId("");
        setEr({ error2: false });
    }
    const [institutes, setinstitutes] = React.useState({
        allUser: []
    });

    const UpdateInstitute = Item => {
        setAdminId(Item.AId);
        setInstituteName(Item.InstituteN);
        setInstituteId(Item.InstituteI);
        setInstId(Item.InstituteI);
        setEr({ error2: true });
    }
    const deleteInstitute = Item => {
        setInstId(Item.InstituteI);
        if (Er.valid === true) {
            Firebase.database()
                .ref('institutes/' + Item.InstituteI)
                .remove()
                .then(() => {
                    setEr({ errordeletein: false });
                    alert("your institute deleted");
                }).catch(err => {
                    console.log(err);
                });
        } else {
            setEr({ errordeletein: true });
        }
    }

    const [tableHead, setTablehead] = useState([
        { tableHead1: 'Team Name', tableHead2: 'Cauch', tableHead3: 'Structure', tableHead4: 'Sport', tableHead5: 'Remove/Update' },
    ])


    const [Id, setId] = React.useState();
    const [Name, setName] = React.useState();
    const [Coach, setCoach] = React.useState();
    const [Structure, setStructure] = React.useState();
    const [Sport, setSport] = React.useState();
    const [InstituteName, setInstitute] = React.useState();
    const [InstId, setInstId] = React.useState();
    const [teams, setTeams] = React.useState();

    const [playersName, setPlayersName] = React.useState();
    const [playersId, setPlayersId] = React.useState();
    const [Er, setEr] = React.useState({
        error: false,
        error2: false,
        error3: false,
        error4: false,
        valid: false,
        error5: false,
        errori: false,
        validecoach: false,
        errorcoach: false,
        errordeletein: false,
    });

    const AddPlayer = () => {
        if (playersId && playersName) {
            if (playersId.length > 8 && playersName.length > 5) {
                setEr({ error: false });
                if (Id) {
                    if (Er.valid === true) {
                        AddPlayers(Id, playersName, playersId)
                            .then(result => {
                                setPlayersId('');
                                setPlayersName('');
                                setEr({ error5: false });
                                setEr({ error3: false, valid: false });
                                alert("success")
                            }).catch(err => {
                                console.log(err);
                            });
                    } else {
                        if (Er.validecoach === true) {
                            AddPlayers(Id, playersName, playersId)
                                .then(result => {
                                    setPlayersId('');
                                    setPlayersName('');
                                    setEr({ error5: false });
                                    setEr({ error3: false, validecoach: false });
                                    alert("success")
                                }).catch(err => {
                                    console.log(err);
                                });
                        } else {
                            setEr({ errorcoach: true });
                        }
                        setEr({ error3: true });
                    }

                } else {

                    setEr({ error5: true });
                }
            } else {
                setEr({ error: true });
            }
        } else {

        }
    }
    const ResetPlayer = () => {
        setPlayersId("");
        setPlayersName("");
        setEr({ error5: false });
    }
    const saveTeam = () => {

        if (Name && Coach && Structure && Sport && InstId && InstituteName) {
            if (Name.length > 2 && Coach.length > 4 && Structure.length > 3) {
                if (Er.valid === true) {
                    submitTeam(Id, '', Name, Coach, Structure, Sport, InstituteName, InstId)
                        .then(result => {
                            setId(null);
                            setName('');
                            setCoach('');
                            setStructure('');
                            setSport('');
                            setInstitute('');
                            setInstId('');
                            setEr({ error3: false, valid: false });
                            alert("success");

                        }).catch(err => {
                            console.log(err);
                        });
                } else {

                    setEr({ error3: true });
                }
            } else {
                setEr({ error4: true });
            }

        } else {

        }
    }

    const deleteAllTeams = () => {

        Firebase
            .database()
            .ref('teams')
            .remove()
            .then(() => {
                setTeams([]);
            });

        alert("Deleted all !")


    };

    const deleteTeam = Item => {
        setInstId(Item.InstituteId);
        if (Er.valid === true) {
            Firebase.database()
                .ref('teams/' + Item.Id)
                .remove()
                .then(() => {

                }).catch(err => {
                    console.log(err);
                })
            Firebase.database()
                .ref('institutes/' + Item.InstituteId + '/' + Item.Id)
                .remove()
                .then(() => {

                }).catch(err => {
                    console.log(err);
                })
            setEr({ error3: false, valid: false });
            setInstId('');
            alert("Delete it!");
        } else {

            setEr({ error3: true });
        }
    };

    const updateTeam = Item => {
        setId(Item.Id);
        setName(Item.Name);
        setCoach(Item.Coach);
        setStructure(Item.Structure);
        setSport(Item.Sport);
        setInstitute(Item.InstituteName);
        setInstId(Item.InstituteId);
        setEr({ error3: false, valid: false });
    };


    const Resetteam = () => {
        setId(null);
        setName('');
        setCoach('');
        setStructure('');
        setSport('');
        setInstitute('');
        setInstId('');
        setEr({ error: false });
    };

    const [team, setteam] = React.useState({
        allUser: []
    });


    React.useEffect(() => {

        Firebase.database().ref('institutes')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uuid = Firebase.auth().currentUser.uid;

                    datasnapshot.forEach((child) => {
                        if (child.val().InstituteId === InstId) {
                            if (child.val().Aid === uuid) {
                                setEr({ valid: true });
                            }
                        }

                    });
                });

            });
    }, []);
    React.useEffect(() => {

        Firebase.database().ref('coaches')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uid = Firebase.auth().currentUser.uid;

                    datasnapshot.forEach((child) => {
                        if (child.val().FullName === Coach) {
                            if (child.val().uuid === uid) {
                                setEr({ validecoach: true });
                            }
                        }

                    });
                });

            });
    }, []);

    React.useEffect(() => {


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
                            InstituteName: child.val().InstituteName,
                            InstituteId: child.val().InstituteId

                        });

                    });
                    setteam({ allUser: usersall });
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

        Firebase.database().ref('/institutes')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    let all = [];

                    datasnapshot.forEach((child) => {

                        all.push({
                            AId: child.val().Aid,
                            InstituteN: child.val().InstituteName,
                            InstituteI: child.val().InstituteId

                        });

                    });
                    setinstitutes({ allUser: all });
                });

            });

    }, []);



    return (
        <ScrollView>
            <View style={styles.container1}>


                <View style={styles.container}>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: colors.text }} >Teams</Text><Text style={{ padding: 0.1 }}>
                    </Text>
                </View>


                <SafeAreaView style={{ flex: 1 }}>

                    <FlatList
                        alwaysBounceVertical={false}
                        data={institutes.allUser}
                        style={{ padding: 5 }}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (

                            <View style={{ marginBottom: 5, margin: 10, marginLeft: 10 }}>
                                {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                                    <LinearGradient colors={['burlywood', '#D81B60', 'antiquewhite']} >
                                        <View style={{ margin: 10 }} >
                                            <TouchableOpacity >
                                                <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 10 }} > {item.InstituteN}   </Text>
                                                    <Text style={{ fontSize: 15, marginLeft: 10 }} > {item.InstituteI}   </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <View style={{ flexDirection: 'row' }}>
                                                {usertype.userRole === 'Admin' ?
                                                    <TouchableOpacity onPress={() => deleteInstitute(item)} >
                                                        <View style={{ margin: 5 }}>
                                                            <Icon name="delete" size={20} color='grey' style={{ margin: 2 }} />
                                                        </View>
                                                    </TouchableOpacity> : null}
                                                {usertype.userRole === 'Admin' ?
                                                    <TouchableOpacity onPress={() => UpdateInstitute(item)}>
                                                        <View style={{ margin: 5 }}>
                                                            <Icon name="pencil-outline" size={20} color='grey' style={{ margin: 2 }} />
                                                        </View>
                                                    </TouchableOpacity> : null}
                                            </View>

                                        </View>

                                    </LinearGradient> : null}
                            </View>
                        )} />

                    {usertype.userRole === 'Admin' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1,]}>
                                <Text style={[styles.textinput, { color: colors.text }]}>Institute Name  </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput placeholder="Your Institute Name"
                                    value={instituteName}
                                    onChangeText={(text) => setInstituteName(text)}
                                    style={styles.input} />
                            </View>
                        </View> : null}
                    {usertype.userRole === 'Admin' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1,]}>
                                <Text style={[styles.textinput, { color: colors.text }]}>Institute Id </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput placeholder=" Unique Id"
                                    value={instituteId}
                                    onChangeText={(text) => setInstituteId(text)}
                                    style={styles.input} />
                            </View>
                        </View> : null}

                    {Er.error2 === true ?
                        <View style={{ margin: 10, alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'royalblue',fontSize:12, marginBottom: 7, margin: 2 }}>If you are
                        need to change your institute id, first completely delete it and recreate an institute.</Text>
                        </View> : null}
                    {Er.errori === true ?
                        <Animatable.View animation="fadeInRight" duration={500}>
                            <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>Enter valid inputs.</Text>
                        </Animatable.View> : null}
                    {Er.errordeletein === true ?
                        <Animatable.View animation="fadeInRight" duration={500}>
                            <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>Institute Admin only can delete/update an institute.</Text>
                        </Animatable.View> : null}

                    {usertype.userRole === 'Admin' ?
                        <View>
                            <TouchableOpacity onPress={() => AddInstitute()}  >
                                <LinearGradient colors={['#D81B60', 'antiquewhite']} style={styles.teambutton}  >
                                    <Text> Create an Institute </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> : null}
                    {usertype.userRole === 'Admin' ?
                        <View>
                            <TouchableOpacity onPress={() => UpdateInstituteButton()}  >
                                <LinearGradient colors={['#D81B60', 'antiquewhite']} style={styles.teambutton}  >
                                    <Text> Update Institute </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> : null}
                    {usertype.userRole === 'Admin' ?
                        <View>
                            <TouchableOpacity onPress={() => ResetInstitute()}  >
                                <LinearGradient colors={['#F06292', 'antiquewhite']} style={styles.teambutton}  >
                                    <Text> Reset </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> : null}


                    {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1,]}>
                                <Text style={[styles.textinput, { color: colors.text }]}>Team Name : </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput placeholder="Your Team Name"
                                    value={Name}
                                    onChangeText={(text) => setName(text)}
                                    style={styles.input} />
                            </View>
                        </View> : null}

                    {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1,]}>
                                <Text style={[styles.textinput, { color: colors.text }]}>Coach : </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput style={styles.input}
                                    value={Coach}
                                    onChangeText={(text) => setCoach(text)}
                                    placeholder="L.K. Karuna" />
                            </View>
                        </View> : null}

                    {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1, {}]}>
                                <Text style={[styles.textinput, { color: colors.text }]}>Sturcture : </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput style={styles.input}
                                    value={Structure}
                                    onChangeText={(text) => setStructure(text)}
                                    placeholder=" Under 15 Female" />
                            </View>
                        </View> : null}

                    {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1]}>
                                <Text style={[styles.textinput, { color: colors.text }]}> Sport : </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput style={styles.input}
                                    value={Sport}
                                    onChangeText={(text) => setSport(text)}
                                    placeholder="Crickets" />
                            </View>
                        </View> : null}

                    {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1]}>
                                <Text style={[styles.textinput, { color: colors.text }]}> Institute  : </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput style={styles.input}
                                    value={InstituteName}
                                    onChangeText={(text) => setInstitute(text)}
                                    placeholder="Saheera" />
                            </View>
                        </View> : null}
                    {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1]}>
                                <Text style={[styles.textinput, { color: colors.text }]}> Institute Id : </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput style={styles.input}
                                    value={InstId}
                                    onChangeText={(text) => setInstId(text)}
                                    placeholder=" Institute Token" />
                            </View>
                        </View> : null}
                    {Er.error4 === true ?
                        <Animatable.View animation="fadeInRight" duration={500}>
                            <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>Enter valid inputs.</Text>
                        </Animatable.View> : null}
                    {Er.error3 === true ?
                        <Animatable.View animation="fadeInRight" duration={500}>
                            <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>You are not Admin in this institue.</Text>
                        </Animatable.View> : null}


                    {usertype.userRole === 'Admin' ?
                        <View>
                            <TouchableOpacity onPress={() => saveTeam()}  >
                                <LinearGradient colors={['yellow', 'antiquewhite']} style={styles.teambutton}  >
                                    <Text> Create a team </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> : null}
                    {usertype.userRole === 'Admin' ?
                        <View>
                            <TouchableOpacity onPress={() => Resetteam()}  >
                                <LinearGradient colors={['khaki', 'antiquewhite']} style={styles.teambutton}  >
                                    <Text> Reset </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> : null}
                    {usertype.userRole === 'coach' ?
                        <View>
                            <TouchableOpacity onPress={() => Resetteam()}  >
                                <LinearGradient colors={['khaki', 'antiquewhite']} style={styles.teambutton}  >
                                    <Text> Reset </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> : null}

                    {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1,]}>
                                <Text style={[styles.textinput, { color: colors.text }]}>Player Token : </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput style={styles.input}
                                    value={playersId}
                                    onChangeText={(text) => setPlayersId(text)}
                                    placeholder=" Token " />
                            </View>
                        </View> : null}
                    {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox1,]}>
                                <Text style={[styles.textinput, { color: colors.text }]}> Player Name : </Text>
                            </View>
                            <View style={styles.infoBox2}>
                                <TextInput style={styles.input}
                                    value={playersName}
                                    onChangeText={(text) => setPlayersName(text)}
                                    placeholder=" K. Nimal " />
                            </View>
                        </View> : null}

                    {Er.error === true ?
                        <Animatable.View animation="fadeInRight" duration={500}>
                            <Text style={{ color: '#FF1744', marginBottom: 7, marginLeft: 50 }}>Enter valid inputs.</Text>
                        </Animatable.View> : null}
                    {Er.errorcoach === true ?
                        <Animatable.View animation="fadeInRight" duration={500}>
                            <Text style={{ color: '#FF1744', marginBottom: 7, marginLeft: 50 }}>you are not coach in this team.</Text>
                        </Animatable.View> : null}
                    {Er.error5 === true ?

                        <Animatable.View animation="fadeInRight" duration={500}>
                            <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>First select an edit button on team.</Text>
                        </Animatable.View> : null}

                    <View style={{ flexDirection: 'row', margin: 10 }}>

                        {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                            <View>
                                <TouchableOpacity onPress={() => AddPlayer()}  >
                                    <LinearGradient colors={['yellow', 'antiquewhite']} style={styles.teambutton}  >
                                        <Text> Add a Player </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View> : null}
                        {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                            <View>
                                <TouchableOpacity onPress={() => ResetPlayer()}  >
                                    <LinearGradient colors={['khaki', 'antiquewhite']} style={styles.teambutton}  >
                                        <Text> Reset Player </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View> : null}
                    </View>

                    <View style={{ marginTop: 20 }} >
                        <Text style={{
                            color: colors.text, fontSize: 20, alignContent: 'center', fontFamily: 'Lemon-Regular',
                            alignItems: 'center', marginLeft: 10, marginBottom: 10,
                        }} > Team Details</Text>
                    </View>

                    <FlatList
                        data={tableHead}
                        renderItem={({ item }) => (

                            <View style={[styles.infoBoxWrapper3, { marginLeft: 2, marginRight: 2, backgroundColor: 'orange' }]} >
                                <TouchableOpacity >
                                    <View style={styles.infoBoxWrapper3}>

                                        <View style={[styles.infoBox3, {
                                            borderRightWidth: 0.5, borderRightColor: 'black', marginRight: 1,
                                        }]}>
                                            <Title style={{ fontSize: 18 }}>{item.tableHead1}</Title>
                                        </View>

                                        <View style={[styles.infoBox3, { borderRightWidth: 0.5, fontSize: 5, borderRightColor: 'black', }]}>
                                            <Title style={{ fontSize: 18 }}>{item.tableHead2}</Title>
                                        </View>
                                        <View style={[styles.infoBox3, { borderRightWidth: 0.5, fontSize: 5, borderRightColor: 'black', }]}>
                                            <Title style={{ fontSize: 18 }}>{item.tableHead3}</Title>
                                        </View>
                                        <View style={[styles.infoBox3II, { borderRightWidth: 0.5, fontSize: 5, borderRightColor: 'black', }]}>
                                            <Title style={{ fontSize: 18 }}>{item.tableHead4}</Title>
                                        </View>
                                        <View style={[styles.infoBox3I, { borderRightWidth: 0.5, fontSize: 5, borderRightColor: 'black', }]}>
                                            <Title style={{ fontSize: 14 }}>{item.tableHead5}</Title>
                                        </View>

                                    </View>

                                </TouchableOpacity>
                            </View>
                        )} />

                    <FlatList
                        alwaysBounceVertical={false}
                        data={team.allUser}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ marginLeft: 2, marginRight: 2 }}>
                                <LinearGradient colors={['burlywood', 'antiquewhite', 'darksalmon']} >
                                    <TouchableOpacity >
                                        <View style={styles.infoBoxWrapper3}>

                                            <View style={[styles.infoBox3, {
                                                borderRightWidth: 0.2, borderRightColor: 'grey', marginRight: 1,
                                            }]}>
                                                <Title style={{ fontSize: 16, color: 'black' }}>{item.Name}</Title>
                                            </View>

                                            <View style={[styles.infoBox3, { borderRightWidth: 0.2, fontSize: 5, borderRightColor: 'black', }]}>

                                                <Title style={{ fontSize: 16, color: 'black' }}>{item.Coach}</Title>

                                            </View>
                                            <View style={[styles.infoBox3, { borderRightWidth: 0.2, fontSize: 5, borderRightColor: 'grey', }]}>
                                                <Title style={{ fontSize: 15, color: 'black' }}>{item.Structure}</Title>
                                            </View>


                                            <View style={[styles.infoBox3II, { borderRightWidth: 0.2, fontSize: 5, borderRightColor: 'grey', }]}>
                                                <Title style={{ fontSize: 16, color: 'black' }}>{item.Sport}</Title>
                                            </View>
                                            {usertype.userRole === 'Admin' || usertype.userRole === 'coach' ?
                                                <View style={[styles.infoBox3I, { borderRightWidth: 0.2, fontSize: 5, borderRightColor: 'grey', }]}>
                                                    {usertype.userRole === 'Admin' ?
                                                        <TouchableOpacity onPress={() => deleteTeam(item)} >
                                                            <Icon name="delete" color="#777777" size={22} />
                                                        </TouchableOpacity> : null}

                                                    <TouchableOpacity onPress={() => updateTeam(item)}>
                                                        <Icon name="pencil-outline" color="#777777" size={28} />
                                                    </TouchableOpacity>

                                                </View>
                                                :
                                                <View style={[styles.infoBox3I, { borderRightWidth: 0.2, fontSize: 5, borderRightColor: 'grey', }]}>
                                                    <TouchableOpacity  >

                                                    </TouchableOpacity>
                                                    <TouchableOpacity >

                                                    </TouchableOpacity>

                                                </View>

                                            }
                                        </View>

                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>

                        )} />

                    <View style={{ marginTop: 20 }}>

                        <Team />

                    </View>




                </SafeAreaView>

                <View style={{ height: 50 }}></View>
            </View>
        </ScrollView >
    )
}

export default FormTeam;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
    container1: {
        flex: 1,

    },
    teambutton: {
        width: 140,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        flexDirection: 'row',
        margin: 5,
    },
    infoBoxWrapper3: {
        borderWidth: 0.1,
        borderColor: 'black',
        flexDirection: 'row',
        height: 70,

    },
    infoBox3: {
        width: '22.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBox3I: {
        width: '16%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBox3II: {
        width: '16.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        borderWidth: 1,
        borderColor: 'darkorange',
        padding: 8,
        margin: 10,
        width: 150,
    },
    textin: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: 'black',
        borderTopWidth: 1,
        borderRightColor: 'green',
        borderRightWidth: 1
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
    textInput: {
        flex: 1,
        backgroundColor: 'lightyellow',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        marginRight: 75,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
    },

    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,

    },


});