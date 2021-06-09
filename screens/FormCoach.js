import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
    FlatList, StatusBar, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import { submitCoach } from '../Firebase/Teams';
import Firebase from '../Firebase/firebaseConfig';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AddUser4, AddCoach } from '../Firebase/Users';
import Feather from 'react-native-vector-icons/Feather';
import { SignUp } from '../Firebase/SignUp';

const FormCoach = () => {

    const { colors } = useTheme();
    const theme = useTheme();

    const [tableHeads2, setTableheads2] = useState([
        {
            tableHeads2a: 'Sport',
            tableHeads2b: 'Cauch Name',
            tableHeads2c: 'Remove/Update'
        },
    ]);

    const [email, setemail] = React.useState();
    const [password, setpassword] = React.useState();
    const [password2, setpassword2] = React.useState();
    const [name1, setname1] = React.useState();
    const [data, setData] = React.useState({
        erroradmin: false,
        errorinputnotvalid: false,
        secureTextEntry: true,

    });

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    }
    const SignUptoFirebase = () => {
        if (password === password2) {
            SignUp(email, password).
                then((res) => {
                    console.log('res', res);

                    var userUID = Firebase.auth().currentUser.uid;
                    AddUser4(name1, '', email, '', userUID).
                        then(() => {
                            AddCoach(name1, '', email, '', userUID).
                                then(() => {
                                    alert("Registered success! Logout new coach account to your account!");
                                }).catch((error) => {
                                    alert(error);
                                })

                        }).catch((error) => {
                            alert(error);
                        })
                    console.log(userUID);
                }).
                catch((err) => {
                    alert(err);
                })
        } else {
            alert("Enter correctlty passwords")
        }
    }

    const [Id, setId] = React.useState();
    const [AdminId, setAdminId] = React.useState();
    const [FullName, setFullName] = React.useState();
    const [CAddress, setCAddress] = React.useState();
    const [TPNumber, setTPNumber] = React.useState();
    const [DOB, setDOB] = React.useState();
    const [Gender, setGender] = React.useState();
    const [Sport, setSport] = React.useState();






    const SubmitCoach = () => {
      
           if(Id&&AdminId&&FullName&&Gender&&Sport){
                submitCoach(Id, AdminId, FullName, CAddress, DOB, TPNumber, Gender, Sport)
                    .then(result => {
                        setId(null);    
                        setFullName('');
                        setCAddress('');
                        setTPNumber('');
                        setDOB('');
                        setGender('');
                        setSport('');
                        setData({ errorinputnotvalid: false })
                        alert("coach added Success!");

                    }).catch(err => {

                        console.log(err);
                    });
                }else{
                    setData({ errorinputnotvalid: true })
                }
       
    }


    const deleteCoach = Item => {
        const userid = Firebase.auth().currentUser.uid;
       
     
            Firebase.database()
                .ref('coaches/' + Item.Id)
                .remove()
                .then(() => {
                    setData({ erroradmin: false })
                }).catch(err => {
                    console.log(err);
                })
            alert("Delete it!");
    

    };

    const updateCoach = Item => {
        setAdminId(Item.Adminid);
        setId(Item.Id);
        setFullName(Item.FullName);
        setCAddress(Item.CAddress);
        setTPNumber(Item.TPNumber);
        setDOB(Item.DOB);
        setGender(Item.Gender);
        setSport(Item.Sport);

        setData({ erroradmin: false })
        setData({ errorinputnotvalid: false })

    };
    const ResetCoach = () => {
        setAdminId('');
        setId(null);
        setFullName('');
        setCAddress('');
        setTPNumber('');
        setDOB('');
        setGender('');
        setSport('');

        setData({ erroradmin: false })
        setData({ errorinputnotvalid: false })

    };



    const [coaches, setcoaches] = React.useState({
        allUser: []
    });

    React.useEffect(() => {
        Firebase.database().ref('/coaches')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    let usersall = [];

                    datasnapshot.forEach((child) => {

                        usersall.push({
                            FullName: child.val().FullName,
                            Sport: child.val().Sport,
                            FName: child.val().FName,
                            LName: child.val().LName,
                            CAddress: child.val().CAddress,
                            PAddress: child.val().PAddress,
                            TPNumber: child.val().TPNumber,
                            DOB: child.val().DOB,
                            Gender: child.val().Gender,
                            Id: child.val().uuid,
                            Name: child.val().name,
                            Adminid: child.val().uid
                        });

                    });
                    setcoaches({ allUser: usersall });
                });

            });

    }, []);

    const [usertype, setUserType] = React.useState({
        userRole: 'gg'
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

    return (

        <View style={{ backgroundColor: colors.background }} >
            <StatusBar backgroundColor="#009387" barStyle={theme.dark ? "light-content" : "dark-content"} />
            <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 18, color: colors.text }} >Create a new coach</Text>
            <SafeAreaView style={{ flex: 1 }}>

                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}>User Name </Text>
                        </View>
                        <View style={[styles.infoBox2, { flexDirection: 'row' }]}>
                            <TextInput placeholder="a@gmail.com" style={styles.input}
                                value={name1}
                                onChangeText={(text) => setname1(text)} />


                        </View>
                    </View> : null}
                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}>Email </Text>
                        </View>
                        <View style={[styles.infoBox2, { flexDirection: 'row' }]}>
                            <TextInput placeholder="a@gmail.com" style={styles.input}
                                value={email}
                                onChangeText={(text) => setemail(text)} />


                        </View>
                    </View> : null}
                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}>Enter Password </Text>
                        </View>
                        <View style={[styles.infoBox2, { flexDirection: 'row' }]}>
                            <TextInput placeholder="set strong password" style={styles.input}
                                value={password} secureTextEntry={data.secureTextEntry ? true : false}
                                onChangeText={(text) => setpassword(text)} />
                            <TouchableOpacity onPress={updateSecureTextEntry} >
                                {data.secureTextEntry ?
                                    <Feather name="eye-off" color="grey" size={16} />
                                    : <Feather name="eye" color="grey" size={16} />}
                            </TouchableOpacity>
                        </View>
                    </View> : null}
                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}> Re Enter Password </Text>
                        </View>
                        <View style={[styles.infoBox2, { flexDirection: 'row' }]}>
                            <TextInput placeholder="reenter password" style={styles.input}
                                value={password2} secureTextEntry={data.secureTextEntry ? true : false}
                                onChangeText={(text) => setpassword2(text)} />
                            <TouchableOpacity onPress={updateSecureTextEntry} >
                                {data.secureTextEntry ?
                                    <Feather name="eye-off" color="grey" size={16} />
                                    : <Feather name="eye" color="grey" size={16} />}
                            </TouchableOpacity>
                        </View>
                    </View> : null}

                {usertype.userRole === 'Admin' ?
                    <View>
                        <TouchableOpacity onPress={() => SignUptoFirebase()}>
                            <LinearGradient colors={['pink', 'chartreuse']} style={styles.teambutton}  >
                                <Text> Registered a coach</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View> : null}



                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}>User Token  </Text>
                        </View>
                        <View style={styles.infoBox2}>
                            <TextInput placeholder="Token" style={styles.input}
                                value={Id}
                                onChangeText={(text) => setId(text)} />
                        </View>
                    </View> : null}
    

                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}>Name with Initials </Text>
                        </View>
                        <View style={styles.infoBox2}>
                            <TextInput style={styles.input} placeholder="K. M. Saman "
                                value={FullName}
                                onChangeText={(text) => setFullName(text)} />
                        </View>
                    </View> : null}

                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}>Current Address  </Text>
                        </View>
                        <View style={styles.infoBox2}>
                            <TextInput style={styles.input} placeholder="No:1, Moratuwa." multiline
                                value={CAddress}
                                onChangeText={(text) => setCAddress(text)} />
                        </View>
                    </View>
                    : null}

            

                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}>Telephone Number </Text>
                        </View>
                        <View style={styles.infoBox2}>
                            <TextInput style={styles.input} placeholder="+94 713099796"
                                value={TPNumber} keyboardType='numeric'
                                onChangeText={(text) => setTPNumber(text)} />
                        </View>
                    </View> : null}

                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}>Date of Birth  </Text>
                        </View>
                        <View style={styles.infoBox2}>
                            <TextInput style={styles.input} placeholder="29/03/1996"
                                value={DOB} keyboardType='numeric'
                                onChangeText={(text) => setDOB(text)} />
                        </View>
                    </View> : null}

                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox1,]}>
                            <Text style={[styles.textinput, { color: colors.text }]}>Gender  </Text>
                        </View>
                        <View style={styles.infoBox2}>
                            <TextInput style={styles.input} placeholder="Male or Female"
                                value={Gender}
                                onChangeText={(text) => setGender(text)} />
                        </View>
                    </View> : null}

                {usertype.userRole === 'Admin' ?
                    <View style={styles.infoBoxWrapper}>
                        <View style={styles.infoBox1}>
                            <Text style={[styles.textinput, { color: colors.text }]}>Sport  </Text>
                        </View>
                        <View style={styles.infoBox2}>
                            <TextInput style={styles.input} placeholder="Cricket"
                                value={Sport}
                                onChangeText={(text) => setSport(text)} />
                        </View>
                    </View> : null}
                {usertype.userRole === 'Admin' ?
                    <View>
                        <TouchableOpacity onPress={() => SubmitCoach()}>
                            <LinearGradient colors={['pink', 'chartreuse']} style={styles.teambutton}  >
                                <Text> Add a coach</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View> : null}
                {usertype.userRole === 'Admin' ?
                    <View>
                        <TouchableOpacity onPress={() => ResetCoach()}>
                            <LinearGradient colors={['sandybrown', 'chartreuse']} style={styles.teambutton}  >
                                <Text> Reset </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View> : null}
                {data.erroradmin === true ?
                    <Animatable.View animation="fadeInRight" duration={500}>
                        <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>You are not created this coach.</Text>
                    </Animatable.View> : null}
                {data.errorinputnotvalid === true ?
                    <Animatable.View animation="fadeInRight" duration={500}>
                        <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>Your entered inputs are not valid.check again.</Text>
                    </Animatable.View> : null}

                <View style={{ marginTop: 23 }} >
                    <Text style={{
                        color: colors.text, fontSize: 18, alignContent: 'center', fontFamily: 'Lemon-Regular',
                        alignItems: 'center', marginLeft: 10, marginBottom: 6,
                    }} > Coaches Details</Text>
                </View>

                <FlatList
                    data={tableHeads2}
                    renderItem={({ item }) => (
                        <View style={[styles.infoBoxWrapper, { backgroundColor: '#00695C', }]} >
                            <TouchableOpacity >
                                <View style={styles.infoBoxWrapper}>
                                    <View style={[styles.infoBox4a, styles.boxst, { marginRight: 1, }]}>
                                        <Title style={{ fontSize: 17, fontWeight: 'bold' }}>{item.tableHeads2a}</Title>
                                    </View>

                                    <View style={[styles.infoBox4b, styles.boxst, { fontSize: 5 }]}>
                                        <Title style={{ fontSize: 17, fontWeight: 'bold' }}>{item.tableHeads2b}</Title>
                                    </View>
                                    <View style={[styles.infoBox4c, styles.boxst, { fontSize: 5 }]}>
                                        <Title style={{ fontSize: 17, fontWeight: 'bold' }}>{item.tableHeads2c}</Title>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </View>
                    )} />


                <FlatList
                    alwaysBounceVertical={false}
                    data={coaches.allUser}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <LinearGradient colors={['#80CBC4', '#E0F2F1', '#00838F']} >
                            <View style={[styles.infoBoxWrapper,]} >
                                <TouchableOpacity >
                                    <View style={styles.infoBoxWrapper}>
                                        <View style={[styles.infoBox4a, styles.boxst, { marginRight: 1, }]}>
                                            <Title style={{ fontSize: 17 }}>{item.Sport}</Title>
                                        </View>
                                        <View style={[styles.infoBox4b, styles.boxst]}>
                                            <Title style={{ fontSize: 17 }}>
                                                {item.FullName}</Title>
                                        </View>

                                        {usertype.userRole === 'Admin' ?
                                            <View style={[styles.infoBox4c, styles.boxst]}>
                                                <TouchableOpacity onPress={() => deleteCoach(item)} >
                                                    <Icon name="delete" color="#777777" size={25} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => updateCoach(item)}>
                                                    <Icon name="pencil-outline" color="#777777" size={27} />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View style={[styles.infoBox4c, styles.boxst]}>
                                                <TouchableOpacity  >

                                                </TouchableOpacity>
                                                <TouchableOpacity >

                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </View>

                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    )} />





            </SafeAreaView>
        </View>
    )
}

export default FormCoach;


const styles = StyleSheet.create({
    container1: {
        flex: 1,

    },
    infoBox3: {
        width: '22.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'green',
        padding: 8,
        margin: 10,
        width: 150,
    },
    inputAdmin: {
        borderWidth: 1,
        borderColor: 'deeppink',
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
    infoBox4a: {
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBox4b: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    infoBox4c: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    teambutton: {
        width: 135,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        flexDirection: 'row',
        margin: 5,
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
        color: '#05375a',
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },

    boxst: {
        borderRightWidth: 0.2,
        borderRightColor: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        borderTopColor: 'black',

    }

});