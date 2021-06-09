import React from 'react';
import {
    StyleSheet, Text, TextInput, View,
    StatusBar, TouchableOpacity, Platform, ScrollView
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import Ionics from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { SignUp } from '../Firebase/SignUp';
import { AddUser3, AddParent } from '../Firebase/Users';
import Firebase from '../Firebase/firebaseConfig';
import { ThemeConsumer } from 'react-native-elements';

export default class Sign3 extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        secureTextEntry: true,
    }

    updateSecureTextEntry = () => {
        this.setState({
            ...this.state,
            secureTextEntry: !this.state.secureTextEntry,
        });
    }
    SignUptoFirebase = () => {
        if (this.state.password === this.state.confirm_password) {
        SignUp(this.state.email, this.state.password).
            then((res) => {
                console.log('res', res);

                var userUID = Firebase.auth().currentUser.uid;
                AddUser3(this.state.name, '', this.state.email, '', userUID).
                    then(() => {
                        AddParent(this.state.name, '', this.state.email, '', userUID).
                        then(() => {
                            alert("Registered success! welcome!");
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





    render() {

        return (
            <ScrollView>
                <View style={styles.container} >
                    <StatusBar backgroundColor="#009387" barStyle="light-content" />

                    <Animatable.View style={[styles.footer, { backgroundColor: 'white' }]} animation="fadeInUpBig" >


                        <Text style={[styles.text_footer, { color: 'black' }]}> First Name</Text>
                        <View style={styles.action}>
                            <Ionics name="ios-person-outline" color='black' size={18} />
                            <TextInput placeholder="Your First Name" style={[styles.textInput, { color: 'black' }]}
                                onChangeText={(text) => this.setState({ name: text })} />
                        </View>

                        <Text style={[styles.text_footer, { color: 'black' }]}> Email</Text>
                        <View style={styles.action}>
                            <FontsAw name="user-o" color='black' size={18} />
                            <TextInput placeholder="Your Email" style={[styles.textInput, { color: 'black' }]}
                                autoCapitalize="none"
                                onChangeText={(text) => this.setState({ email: text })} />
                                   {this.state.email.length > 8 ?
                                <Animatable.View animation="bounceIn" >
                                    <Feather name="check-circle" color="green" size={20} />
                                </Animatable.View>
                                : null}
                        </View>


                        <Text style={[styles.text_footer, { color: 'black' }, { marginTop: 20 }]}> Password </Text>
                        <View style={styles.action}>
                            <FontsAw name="lock" color=' black' size={20} />
                            <TextInput placeholder="Your Password" style={styles.textInput}
                                autoCapitalize="none" secureTextEntry={this.state.secureTextEntry ? true : false}
                                onChangeText={(text) => this.setState({ password: text })} />
                                 <TouchableOpacity onPress={()=> this.updateSecureTextEntry()} >
                                {this.state.secureTextEntry ?
                                    <Feather name="eye-off" color="grey" size={20} />
                                    : <Feather name="eye" color="grey" size={20} />}
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.text_footer, { color: 'black' }, { marginTop: 20 }]}> Confirm Password </Text>
                        <View style={styles.action}>
                            <FontsAw name="lock" color=' black' size={20} />
                            <TextInput placeholder="Your Password" style={styles.textInput}
                                autoCapitalize="none" secureTextEntry={this.state.secureTextEntry ? true : false}
                                onChangeText={(text) => this.setState({ confirm_password: text })} />
                                 <TouchableOpacity onPress={()=> this.updateSecureTextEntry()} >
                                {this.state.secureTextEntry ?
                                    <Feather name="eye-off" color="grey" size={20} />
                                    : <Feather name="eye" color="grey" size={20} />}
                            </TouchableOpacity>
                        </View>


                        <View style={styles.button}>
                            <TouchableOpacity style={styles.signIn} onPress={() => this.SignUptoFirebase()} >
                                <LinearGradient colors={['#2f4f4f', "#009387"]} style={styles.signIn}  >
                                    <Text style={styles.textSign}> Sign Up </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </Animatable.View>

                </View>
            </ScrollView>
        );
    };
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
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
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
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
        width: '70%',
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


