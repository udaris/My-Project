import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';

import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';


const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={{ fontFamily:'Lemon-Regular',fontSize: 40, }}> My Sports </Text>
                <Animatable.Image
                    animation="bounceIn" duration={10000}
                    source={require('../assets/logo.png')}
                    resizeMode={'stretch'} style={styles.logo} /></View>


            <Animatable.View style={[styles.footer, { margin:15,
                backgroundColor: colors.background }]} animation="fadeInUpBig"  >
                <Text style={[styles.title,{fontFamily:'HiMelody-Regular'}]}>Stay connected with everyone ! </Text>
                <Text style={[styles.Text,{fontFamily:'HiMelody-Regular',fontSize:20}]}>Sign in with the account in here </Text>
                <Text></Text>

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign IN')} >

                        <LinearGradient colors={['#2f4f4f', '#ff1493']} style={styles.signIn}  >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcon name="arrow-forward-ios" size={20} color={'white'} />
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </Animatable.View>

        </View>
    );
};

export default SplashScreen;



const { height } = Dimensions.get("screen");
const height_logo = height * 0.22;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 2.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        borderBottomLeftRadius:70,
        borderBottomRightRadius:70,
        paddingVertical: 30,
        paddingHorizontal: 30,

    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        color: '#2f4f4f',
        fontSize: 40,
    },

    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    signIn: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',

    },

    textSign: {
        color: 'white',
        fontWeight: 'bold',
    }
});
