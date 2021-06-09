import React from 'react';
import {
    StyleSheet, Text, View,
    StatusBar, TouchableOpacity,  Platform, ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { ThemeConsumer } from 'react-native-elements';
import Sign from './Sign';

const SignUpScreen1 = ({ navigation }) => {


    const { colors } = useTheme();

    return (
        <ScrollView>
            <View style={styles.container} >
                <StatusBar backgroundColor="#009387" barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}> Register Now ! </Text>
                </View>
                <Sign />
                <Animatable.View style={[styles.footer, { backgroundColor: colors.background }]} animation="fadeInUpBig" >
                    <View>
                        <Text style={{fontSize:20, fontStyle:'italic', fontWeight:'bold'}} >Sign in here again to log the Home Screen </Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Sign IN')}
                        style={[styles.signIn, { marginTop: 10, marginBottom:10 }]}>
                        <LinearGradient colors={[ '#26A69A','grey']} style={styles.signIn}  >
                            <Text style={styles.textSign}> Sign In </Text>
                        </LinearGradient>
                    </TouchableOpacity>


                </Animatable.View>

            </View>
        </ScrollView>
    );
};

export default SignUpScreen1;

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
        paddingVertical: 30,
        marginBottom:10
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
   
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft:23
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
})


