import React, { Component, useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
  FlatList, Alert, ScrollView, Image, Dimensions, StatusBar, TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Avatar, Title, TouchableRipple, } from 'react-native-paper';

const Head = () => {
    const [tableHeads3, setTableheads3] = useState([
        { tableHeads3a: 'Tourlement Name', tableHeads3b: 'Sport', tableHeads3c: 'Status', tableHeads3d: 'Remove/Update' },
      ])

      return(
      

      <View style={styles.container1}>
      
     <SafeAreaView style={{ flex: 1 }}>
        
            <FlatList
              data={tableHeads3}
              renderItem={({ item }) => (
                <View style={[styles.infoBoxWrapper, { backgroundColor: 'mediumpurple' }]} >
                  <TouchableOpacity >
                    <View style={styles.infoBoxWrapper}>
                      <View style={[styles.infoBox5a, {
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        borderTopColor: 'black',
                        borderTopColor: 'black',
                        borderRightWidth: 1, borderRightColor: 'black', marginRight: 1,
                      }]}>
                        <Title style={{ fontSize: 17, }}>{item.tableHeads3a}</Title>
                      </View>

                      <View style={[styles.infoBox5b, {
                        borderRightWidth: 1, fontSize: 5,
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        borderTopColor: 'black',
                        borderTopColor: 'black',
                        borderRightColor: 'black',
                      }]}>
                        <Title style={{ fontSize: 17, }}>{item.tableHeads3b}</Title>
                      </View>

                      <View style={[styles.infoBox5b, {
                        borderRightWidth: 1, fontSize: 5,
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        borderTopColor: 'black',
                        borderTopColor: 'black',
                        borderRightColor: 'black',
                      }]}>
                        <Title style={{ fontSize: 17, }}>{item.tableHeads3c}</Title>
                      </View>
                      <View style={[styles.infoBox5c, {
                        borderRightWidth: 1, fontSize: 5,
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        borderTopColor: 'black',
                        borderTopColor: 'black',
                        borderRightColor: 'black',
                      }]}>
                        <Title style={{ fontSize: 12, }}>{item.tableHeads3d}</Title>
                      </View>

                    </View>

                  </TouchableOpacity>
                </View>
              )} />
           
          </SafeAreaView>
   
        </View>

  )
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
  container1: {
    flex: 1,

  },
  infoBoxWrapper3: {
    borderWidth: 1,
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
    width: '18%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox3II: {
    width: '19%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: height_logo * 2,
    height: height_logo,
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
    // paddingLeft:50,
    //paddingRight:150
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
  infoBoxWrapper4: {
    flexDirection: 'row',
    height: 60,
    borderWidth: 1,
    borderColor: 'black'
  },
  infoBox5a: {
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox5b: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox5c: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoBoxWrapper5: {
    flexDirection: 'row',
    height: 60,
    borderWidth: 1,
    borderColor: 'black'
  },
  teambutton: {
    width: 120,
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
  button: {

  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  head: {
    height: 40,
    backgroundColor: '#808B97'
  },
  text: {
    margin: 6
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF1C1'
  },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: '#78B7BB',
    borderRadius: 2
  },
  btnText: {
    textAlign: 'center',
    color: '#fff'
  },

  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },


});






export default Head;