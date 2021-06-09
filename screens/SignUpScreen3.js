import React from 'react';
import {
    StyleSheet, Text, View,
    StatusBar, TouchableOpacity, Platform, ScrollView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Sign3 from './Sign3';

const SignUpScreen3 = ({ navigation }) => {


    const { colors } = useTheme();

    return (
        <ScrollView>
            <View style={styles.container} >
                <StatusBar backgroundColor="#009387" barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}> Register Now ! </Text>
                </View>
                <Sign3 />
                <Animatable.View style={[styles.footer, { backgroundColor: colors.background }]} animation="fadeInUpBig" >
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Sign in here again to log the Home Screen </Text>
                    </View>
                    <View style={styles.button}>
                        <LinearGradient colors={['#2f4f4f', '#26A69A']} style={styles.signIn}  >
                            <TouchableOpacity onPress={() => navigation.navigate('Sign IN')} >
                                <Text style={styles.textSign}> Sign In </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                </Animatable.View>

            </View>
        </ScrollView>
    );
};  

export default SignUpScreen3;

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
        width: '48%',
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

