import React from 'react';
import {
    StyleSheet, Text, TextInput, View,
    StatusBar, Button, TouchableOpacity, Dimensions, Platform, ScrollView
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import Ionics from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

const SignUpScreen2 = ({ navigation }) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        })
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        })
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        })
    }

    const { colors } = useTheme();

    return (
        <ScrollView>
            <View style={styles.container} >
                <StatusBar backgroundColor="#009387" barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}> Register Now ! </Text>
                </View>

                <Animatable.View style={[styles.footer, { backgroundColor: colors.background }]} animation="fadeInUpBig" >


                    <Text style={[styles.text_footer, { color: colors.text }]}> First Name</Text>
                    <View style={styles.action}>
                        <Ionics name="ios-person-outline" color={colors.text} size={18} />
                        <TextInput placeholder="Your First Name" style={[styles.textInput, { color: colors.text }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)} />

                        {data.check_textInputChange ?
                            <Animatable.View animation="bounceIn" >
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                            : null}

                    </View>

                    <Text style={[styles.text_footer, { color: colors.text }, { marginTop: 20 }]}> Second Name </Text>
                    <View style={styles.action}>
                        <Ionics name="ios-person-sharp" color={colors.text} size={18} />
                        <TextInput placeholder="Your Second Name" style={styles.textInput}
                            secureTextEntry={data.secureTextEntry ? true : false} autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)} />

                    </View>

                    <Text style={[styles.text_footer, { color: colors.text }, { marginTop: 20 }]}> Current Address </Text>
                    <View style={styles.action}>
                        <Ionics name="md-home-outline" color={colors.text} size={18} />
                        <TextInput placeholder="Current Address" style={styles.textInput} multiline={true} numberOfLines={3}
                            secureTextEntry={data.secureTextEntry ? true : false} autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)} />

                    </View>

                    <Text style={[styles.text_footer, { color: colors.text }, { marginTop: 20 }]}> Permanent Address </Text>
                    <View style={styles.action}>
                        <Ionics name="md-home-sharp" color={colors.text} size={18} />
                        <TextInput placeholder="Permanent Address" style={styles.textInput} multiline={true} numberOfLines={3}
                            secureTextEntry={data.secureTextEntry ? true : false} autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)} />

                    </View>

                    <Text style={[styles.text_footer, { color: colors.text }, { marginTop: 20 }]}> Telephone Number </Text>
                    <View style={styles.action}>
                        <Ionics name="md-call-sharp" color={colors.text} size={18} />
                        <TextInput placeholder="Telephone Number" style={styles.textInput}
                            secureTextEntry={data.secureTextEntry ? true : false} autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)} />

                    </View>


                    <Text style={[styles.text_footer, { color: colors.text }, { marginTop: 20 }]}> Sport </Text>
                    <View style={styles.action}>
                        <Material name="sports-handball" color={colors.text} size={18} />
                        <TextInput placeholder="Sport" style={styles.textInput}
                            secureTextEntry={data.secureTextEntry ? true : false} autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)} />

                    </View>

                    <Text style={[styles.text_footer, { color: colors.text }, { marginTop: 20 }]}> Working Experience </Text>
                    <View style={styles.action}>

                        <TextInput placeholder="Working Experience" style={styles.textInput} multiline={true} numberOfLines={8}
                            secureTextEntry={data.secureTextEntry ? true : false} autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)} />

                    </View>

                    <Text style={[styles.text_footer, { color: colors.text }, { marginTop: 20 }]}> Other Qualifications </Text>
                    <View style={styles.action}>

                        <TextInput placeholder="Other Qualifications" style={styles.textInput} multiline={true} numberOfLines={8}
                            secureTextEntry={data.secureTextEntry ? true : false} autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)} />

                    </View>

                    <Text style={[styles.text_footer, { color: colors.text }]}> Email</Text>
                    <View style={styles.action}>
                        <FontsAw name="user-o" color={colors.text} size={20} />
                        <TextInput placeholder="Your Email" style={[styles.textInput, { color: colors.text }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)} />

                        {data.check_textInputChange ?
                            <Animatable.View animation="bounceIn" >
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                            : null}

                    </View>


                    <Text style={[styles.text_footer, { color: colors.text }, { marginTop: 20 }]}> Password </Text>
                    <View style={styles.action}>
                        <FontsAw name="lock" color={colors.text} size={20} />
                        <TextInput placeholder="Your Password" style={styles.textInput}
                            secureTextEntry={data.secureTextEntry ? true : false} autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)} />
                        <TouchableOpacity onPress={updateSecureTextEntry} >
                            {data.secureTextEntry ?
                                <Feather name="eye-off" color="grey" size={20} />
                                : <Feather name="eye" color="grey" size={20} />}
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text_footer, { color: colors.text }, { marginTop: 20 }]}> Confirm Password </Text>
                    <View style={styles.action}>
                        <FontsAw name="lock" color={colors.text} size={20} />
                        <TextInput placeholder="ReEnter Your Password" style={styles.textInput}
                            secureTextEntry={data.secureTextEntry ? true : false} autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)} />
                        <TouchableOpacity onPress={updateConfirmSecureTextEntry} >
                            {data.secureTextEntry ?
                                <Feather name="eye-off" color="grey" size={20} />
                                : <Feather name="eye" color="grey" size={20} />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.button}>
                        <LinearGradient colors={['#2f4f4f', '#ff1493']} style={styles.signIn}  >
                            <Text style={styles.textSign}> Submit </Text>
                        </LinearGradient>

                        <TouchableOpacity onPress={() => navigation.navigate('Sign IN')}
                            style={[styles.signIn, { borderColor: "black", borderWidth: 1, marginTop: 15 }]}>
                            <Text style={styles.textSign}> Sign In </Text></TouchableOpacity>
                    </View>

                </Animatable.View>

            </View>
        </ScrollView>
    );
};

export default SignUpScreen2;

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



/*

                <View style={styles.button}>
                 <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")}
                    style={[styles.signIn,{borderColor:"black", borderWidth:1, marginTop:15}]}>
                    <LinearGradient colors={['#2f4f4f','#ff1493']} style={styles.signIn}  >
                        <Text style={styles.textSign}> Submit</Text>
                    </LinearGradient>
                    </TouchableOpacity>


*/