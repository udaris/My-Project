import React from 'react';
import {
    View, Text, StyleSheet, KeyboardAvoidingView,
    Platform, ScrollView, TouchableOpacity, TextInput
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import Ionics from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { submitUserDetails } from '../Firebase/submitUserDetails';
import Firebase from '../Firebase/firebaseConfig';


export default class EditProfile extends React.Component {

    state = {
        Id: '',
        firstName: '',
        secondName: '',
        position: '',
        currentAddress: '',
        permentAddress: '',
        dob: '',
        age: '',
        gender: '',
        medicalDetails: '',
        winners: '',
        strengths: '',
        experiences: '',
        otherqualifications: '',
        tpnumber: '',
        gplayer: '',
        sport: '',
        userEmail: ''
    };

    async componentDidMount(){

        try {
            await Firebase.database().ref('usersDetails')
              .on("value", async (datasnapshot) => {
      
                new Promise((resolve, reject) => {
      
                  const uuid = Firebase.auth().currentUser.uid;
      
                  datasnapshot.forEach((child) => {
      
                    if (child.val().Id === uuid) {
                      this.setState({
                        firstName: child.val().firstName,
                        secondName: child.val().secondName,
                        tpnumber : child.val().tpnumber,
                        currentAddress: child.val().currentAddress,
                        permentAddress:child.val().permentAddress,
                        medicalDetails: child.val().medicalDetails,
                        winners: child.val().winners,
                        strengths: child.val().strengths,
                        experienes: child.val().experiences,
                        otherqualifications: child.val().otherqualifications,
                        sport: child.val().sport,
                        Id: child.val().Id,
                        age:child.val().age,
                        dob:child.val().dob,
                        gender:child.val().gender,
                        position:child.val().position,
                        userEmail:child.val().userEmail
                      })
                    }
      
                  });
                })
              });
          } catch (error) {
            alert(error);
          }
    }
    
    saveUserDetails = () => {
        if (this.state.firstName.length > 3 && this.state.gender.length > 3
            && this.state.position.length > 4
            && this.state.dob.length > 6) {

            submitUserDetails(this.state.Id, this.state.firstName,
                this.state.secondName,
                this.state.position, this.state.currentAddress,
                this.state.permentAddress, this.state.dob,
                this.state.age, this.state.gender,
                this.state.medicalDetails,
                this.state.winners, this.state.strengths,
                this.state.experiences,
                this.state.otherqualifications,
                this.state.tpnumber, this.state.gplayer,
                this.state.sport, this.state.userEmail)
                .then(result => {

                    alert("Profile edited success")
                }).catch(err => {
                    console.log(err);
                });

        } else {
            alert("not well inserted !")
        }

    }

    render() {


        return (

            <KeyboardAvoidingView style={styles.container} >

                <View style={{flexDirection:'row',
                    height: 70, width: '100%', position: 'absolute', top: 0,
                    backgroundColor: 'pink', }}>
                    <View style={{flexDirection:'row'}} >
                        <View>
                            <TouchableOpacity
                                onPress={this.props.closeModal}
                                style={{ left: 10 ,top:12}} >
                                <Icons name='arrow-back' size={30} color='black' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center',left:80, top:12 }}>
                            <Text style={{ alignContent: 'center', marginTop:5,fontFamily:'Lemon-Regular', fontSize: 20, alignItems: 'center' }}>
                                Edit Profile
                            </Text>
                        </View>
                    </View>

                </View>

                <View style={{ width: '90%', top: 80, backgroundColor: 'gainsboro' }} >
                    <ScrollView>
                        <View style={{ alignItems: 'center', marginTop:10}} >
                            <Text style={{ color: 'deeppink', fontSize: 14,fontFamily:'Lemon-Regular', marginBottom: 15 }}> Fill necessary all details as your user type. Otherwise no need. </Text>
                        </View>

                        <Text style={[styles.text_footer,]}> First Name</Text>
                        <View style={[styles.action, { left: 5 }]}>
                            <Ionics name="ios-person-outline" color='black' size={18} />
                            <TextInput placeholder="Vilan" style={[styles.textInput, { color: 'black' }]}
                                value={this.state.firstName}
                                onChangeText={(text) => this.setState({ firstName: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Second Name</Text>
                        <View style={[styles.action, { left: 5 }]}>
                            <FontsAw name="user-o" color='black' size={18} />
                            <TextInput placeholder=" Anushka" style={[styles.textInput, { color: 'black' }]}
                                        value={this.state.secondName}
                                onChangeText={(text) => this.setState({ secondName: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Who you are ? Player/ Coach/ Parent</Text>
                        <View style={[styles.action, { left: 5 }]}>
                            <Ionics name="ios-person-outline" color='black' size={18} />
                            <TextInput placeholder="player" style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none"value={this.state.position}
                                onChangeText={(text) => this.setState({ position: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Current Address</Text>
                        <View style={[styles.action, { left: 5 }]}>
                            <Ionics name="md-home-outline" color='black' size={18} />
                            <TextInput placeholder="No:3, Hilton, Matara." style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" multiline={true} numberOfLines={3}
                               value={this.state.currentAddress}
                                onChangeText={(text) => this.setState({ currentAddress: text })}
                            />
                        </View>

                        <Text style={[styles.text_footer,]}> Permenent Address </Text>
                        <View style={[styles.action, { left: 5 }]}>
                            <Ionics name="md-home-outline" color='black' size={18} />
                            <TextInput placeholder="No:3, Hilton, Matara." style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" multiline={true} numberOfLines={3}
                                value={this.state.permentAddress}
                                onChangeText={(text) => this.setState({ permentAddress: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Date of Birth</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <MCIcons name="cake" color='black' size={18} />
                            <TextInput placeholder="12/08/1996" style={[styles.textInput, { color: 'black' }]}
                                keyboardType="numeric" value={this.state.dob}
                                onChangeText={(text) => this.setState({ dob: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Age</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <Ionics name="man" color='black' size={18} />
                            <TextInput placeholder="24" style={[styles.textInput, { color: 'black' }]}
                                keyboardType="numeric"value={this.state.age}
                                onChangeText={(text) => this.setState({ age: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Gender</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <Ionics name="male-female" color='black' size={18} />

                            <TextInput placeholder="Male / Female" style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" value={this.state.gender}
                                onChangeText={(text) => this.setState({ gender: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Medical Details</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <MCIcons name="medical-bag" color='black' size={18} />
                            <TextInput placeholder="Blood type, Height,Weight, " style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" multiline={true} numberOfLines={3}
                                value={this.state.medicalDetails}   onChangeText={(text) => this.setState({ medicalDetails: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Your winners</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <Ionics name="md-golf" color='black' size={18} />
                            <TextInput placeholder="Winner in Rushes 2020" style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" multiline={true} numberOfLines={3}
                                value={this.state.winners}  onChangeText={(text) => this.setState({ winners: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Strengths</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <MCIcons name="crown-outline" color='black' size={18} />
                            <TextInput placeholder="Speed runner/left-hand player" style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" multiline={true} numberOfLines={3}
                                value={this.state.strengths} onChangeText={(text) => this.setState({ strengths: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Your Experiences</Text>
                        <View style={[styles.action, { left: 15 }]}>

                            <MCIcons name="crown" color='black' size={18} />
                            <TextInput placeholder=" " style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" multiline={true} numberOfLines={3}
                                value={this.state.experiences}   onChangeText={(text) => this.setState({ experiences: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Other Qualifications </Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <MCIcons name="badge-account-horizontal-outline" color='black' size={18} />
                            <TextInput placeholder=" " style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" multiline={true} numberOfLines={3}
                                value={this.state.otherqualifications}  onChangeText={(text) => this.setState({ otherqualifications: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Telephone Number</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <Ionics name="md-call-sharp" color='black' size={18} />
                            <TextInput placeholder="071-8569633" style={[styles.textInput, { color: 'black' }]}
                                keyboardType="numeric" value={this.state.tpnumber}
                                onChangeText={(text) => this.setState({ tpnumber: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> User Email</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <MCIcons name="email" color='black' size={18} />
                            <TextInput placeholder="amal@gmail.com" style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" value={this.state.userEmail}
                                onChangeText={(text) => this.setState({ userEmail: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}> Guardian of Player</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <FontsAw name="user-o" color='black' size={18} />
                            <TextInput placeholder="Y. K. Karuna" style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" value={this.state.gplayer}
                                onChangeText={(text) => this.setState({ gplayer: text })} />
                        </View>

                        <Text style={[styles.text_footer,]}>Sport</Text>
                        <View style={[styles.action, { left: 15 }]}>
                            <Material name="sports-handball" color='black' size={18} />
                            <TextInput placeholder="Vollyball" style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none" value={this.state.sport}
                                onChangeText={(text) => this.setState({ sport: text })} />
                        </View>

                        <View style={{ marginTop: 10, marginLeft: 10, width: '70%' }}>
                            <TouchableOpacity style={[styles.signIn, { marginTop: 10 }]}
                                onPress={() => this.saveUserDetails()} >
                                <LinearGradient colors={['grey', 'pink']} style={styles.signIn}  >
                                    <Text style={styles.textSign}> Save </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 100 }}></View>
                    </ScrollView>

                </View>

            </KeyboardAvoidingView>

        )
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,

    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        left: 5,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'pink',
        paddingBottom: 5

    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        left: 5
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
})