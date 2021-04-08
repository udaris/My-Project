import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, ScrollView, Image, Dimensions, StatusBar, TextInput } from 'react-native';
import { Button } from 'react-native-share';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Avatar, Title, TouchableRipple, } from 'react-native-paper';


const TeamScreen = () => {

  const [tableHead, setTablehead] = useState([
    { tableHead1: 'Team Name', tableHead2: 'Cauch', tableHead3: 'Structure', tableHead4: 'Sport' },
  ])
  const [tabledata, setTabledata] = useState([
    { col1: 'Team1', col2: 'E.K.Ekanayaka', col3: 'under 15 Female', col4: 'Vallyball', key: '1' },
    { col1: 'Team2', col2: 'S. Sunethra', col3: 'under 13 Male', col4: 'Netball', key: '2' },
    { col1: 'Team3', col2: 'H.Herath', col3: 'under 17 Female', col4: 'Cricket', key: '3' },
    { col1: 'Team4', col2: 'Y.Shantha', col3: 'under 15 Male', col4: 'Football', key: '4' },
  ])

  const pressHandler = (key) => {
    setTabledata((deleteTodos) => {
      return deleteTodos.filter(todo => todo.key != key);
    });
  }

  const [col1, setcol1] = useState('');
  const [col2, setcol2] = useState('');
  const [col3, setcol3] = useState('');
  const [col4, setcol4] = useState('');


  const changeHandler1 = (val) => {
    setcol1(val);
  }
  const changeHandler2 = (val) => {
    setcol2(val);
  }
  const changeHandler3 = (val) => {
    setcol3(val);
  }
  const changeHandler4 = (val) => {
    setcol4(val);
  }


  const submitHandler = (col1, col2, col3, col4) => {
    setTabledata((deleteTodos) => {
      return [
        { col1: col1, col2: col2, col3: col3, col4: col4, key: Math.random().toString() },
        ...deleteTodos
      ];
    });
  }


  //form2
  
  const [tableHeads2, setTableheads2] = useState([
    { tableHeads2a: 'Sport',tableHeads2b: 'Cauch Name'},
  ])
  const [tabledata2, setTabledata2] = useState([
    { colu1: 'Cricket', colu2: 'E.K.Ekanayaka',  key1: '1' },
    { colu1: 'Football', colu2: 'S. Sunethra',  key1: '2' },
    { colu1: 'Netball', colu2: 'H.Herath',  key1: '3' },
    { colu1: 'Rugby', colu2: 'Y.Shantha', key1: '4' },
  ])

  const pressHandler2 = (key1) => {
    setTabledata2((deleteTodos2) => {
      return deleteTodos2.filter(todo2 => todo2.key1 != key1);
    });
  }

  const [colu1, setcolu1] = useState('');
  const [colu2, setcolu2] = useState('');
 


  const changeHandlerA = (val) => {
    setcolu1(val);
  }
  const changeHandlerB = (val) => {
    setcolu2(val);
  }
 


  const submitHandler2 = (colu1, colu2) => {
    setTabledata((deleteTodos2) => {
      return [
        { col1: col1, col2: col2, key1: Math.random().toString() },
        ...deleteTodos2
      ];
    });
  }




  return (


    <ScrollView style={styles.container1}>

      <View style={styles.container1}>
        <StatusBar backgroundColor="#009387" />

        <View style={{ alignItems: "center", fontSize: 40 }}>

          <Animatable.Image
            animation="bounceIn" duration={10000}
            source={require('../assets/team.jpg')}
            resizeMode={'stretch'} style={[styles.logo, { marginTop: 2 }]} />
        </View>

        <View style={styles.container}>
          <Text style={{ fontWeight: 'bold' }} >Team  Details</Text><Text style={{ padding: 0.1 }}></Text>

          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.infoBoxWrapper}>
              <View style={[styles.infoBox1, {

              }]}>
                <Text style={styles.textinput}>Team Name : </Text>
              </View>
              <View style={styles.infoBox2}>
                <TextInput placeholder="Your Team Name" style={styles.input} onChangeText={changeHandler1} />
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View style={[styles.infoBox1, {

              }]}>
                <Text style={styles.textinput}>Coach : </Text>
              </View>
              <View style={styles.infoBox2}>
                <TextInput style={styles.input} placeholder="L.K. Karuna" onChangeText={changeHandler2} />
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View style={[styles.infoBox1, {

              }]}>
                <Text style={styles.textinput}>Sturcture : </Text>
              </View>
              <View style={styles.infoBox2}>
                <TextInput style={styles.input} placeholder=" Under 15 Female" onChangeText={changeHandler3} />
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View style={[styles.infoBox1, {

              }]}>
                <Text style={styles.textinput}> Sport : </Text>
              </View>
              <View style={styles.infoBox2}>
                <TextInput style={styles.input} placeholder="Vallyball" onChangeText={changeHandler4} />
              </View>
            </View>

            <View>
              <TouchableOpacity ><Button onPress={() => submitHandler(col1, col2, col3, col4)}>
                <LinearGradient colors={['slategray', '#ff1493']} style={styles.teambutton}  >
                  <Text> Add a team </Text>
                </LinearGradient>
              </Button>
              </TouchableOpacity>
            </View>


            <View style={{ marginTop: 20 }} >
              <Text style={{
                color: 'saddlebrown', fontSize: 20, alignContent: 'center', fontWeight: 'bold',
                alignItems: 'center', marginLeft: 10, marginBottom: 6,
              }} > Team Details</Text>
            </View>

            <FlatList
              data={tableHead}
              renderItem={({ item }) => (
                <View style={[styles.infoBoxWrapper3, { backgroundColor: 'orange' }]} >
                  <TouchableOpacity >
                    {/* <TouchableOpacity onPress={() => pressHandler(item.key)} ></TouchableOpacity>*/}
                    <View style={styles.infoBoxWrapper3}>
                      <View style={[styles.infoBox3, {
                        borderRightWidth: 1, borderRightColor: 'black', marginRight: 1,
                      }]}>
                        <Title>{item.tableHead1}</Title>

                      </View>
                      <View style={[styles.infoBox3, { borderRightWidth: 1, fontSize: 5, borderRightColor: 'black', }]}>
                        <Title>{item.tableHead2}</Title>

                      </View>
                     
                     
                    </View>

                  </TouchableOpacity>
                </View>
              )} />


            <FlatList
              data={tabledata}
              renderItem={({ item }) => (
                <View style={[styles.infoBoxWrapper3, { backgroundColor: '#ffe4b5' }]} >
                  <TouchableOpacity >
                    <View style={styles.infoBoxWrapper3}>
                      <View style={[styles.infoBox3, {
                        borderRightWidth: 1, borderRightColor: 'black', marginRight: 1,
                      }]}>
                        <Title>{item.col1}</Title>

                      </View>
                      <View style={[styles.infoBox3, { borderRightWidth: 1, fontSize: 5, borderRightColor: 'black', }]}>
                        <Title>{item.col2}</Title>

                      </View>
                      <View style={[styles.infoBox3, { borderRightWidth: 1, fontSize: 5, borderRightColor: 'black', }]}>
                        <Title>{item.col3}</Title>

                      </View>
                      <View style={[styles.infoBox3, { borderRightWidth: 1, fontSize: 5, borderRightColor: 'black', }]}>
                        <Title>{item.col4}</Title>

                      </View>
                    </View>

                  </TouchableOpacity>
                </View>
              )} />
          </SafeAreaView>

          <View style={{ height: 50 }}></View>

          
          <View >
            <Text style={{ fontWeight: 'bold' }} >Create a new coach</Text>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, { //Form2

                }]}>
                  <Text style={styles.textinput}>First Name : </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput placeholder="Saman" style={styles.input} />
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, {
                }]}>
                  <Text style={styles.textinput}>Last Name: </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="Kodippilige "  />
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, {
                }]}>
                  <Text style={styles.textinput}>Name with Initials: </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="K. M. Saman " onChangeText={changeHandlerB}   />
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, {

                }]}>
                  <Text style={styles.textinput}>Current Address : </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="No:1, Moratuwa." multiline />
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, {

                }]}>
                  <Text style={styles.textinput}>Permenent Address : </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="No:7, Tissa." />
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, {

                }]}>
                  <Text style={styles.textinput}>Telephone Number : </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="+94 713099796" />
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, {

                }]}>
                  <Text style={styles.textinput}>Date of Birth : </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="29/03/1996"  />
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, {

                }]}>
                  <Text style={styles.textinput}>Sex : </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="Male or Female"  />
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, {

                }]}>
                  <Text style={styles.textinput}>Sport : </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="Cricket" onChangeText={changeHandlerA} />
                </View>
              </View>

              <View>
                <TouchableOpacity ><Button onPress={() => submitHandler(colu1, colu2)}>
                  <LinearGradient colors={['pink', '#ff1493']} style={styles.teambutton}  >
                    <Text> Add a coach</Text>
                  </LinearGradient>
                </Button>
                </TouchableOpacity>
              </View>


              <View style={{ marginTop: 20 }} >
                <Text style={{
                  color: 'saddlebrown', fontSize: 20, alignContent: 'center', fontWeight: 'bold',
                  alignItems: 'center', marginLeft: 10, marginBottom: 6,
                }} > Coaches Details</Text>
              </View>

              <FlatList
                data={tableHeads2}
                renderItem={({ item }) => (
                  <View style={[styles.infoBoxWrapper3, { backgroundColor: 'green' }]} >
                    <TouchableOpacity >
                      <View style={styles.infoBoxWrapper3}>
                        <View style={[styles.infoBox3, {
                          borderRightWidth: 1, borderRightColor: 'black', marginRight: 1,
                        }]}>
                          <Title>{item.tableHeads2a}</Title>

                        </View>
                        <View style={[styles.infoBox3, { borderRightWidth: 1, fontSize: 5, borderRightColor: 'black', }]}>
                          <Title>{item.tableHeads2b}</Title>

                        </View>
                      </View>

                    </TouchableOpacity>
                  </View>
                )} />


              <FlatList
                data={tabledata2} 
                renderItem={({ item }) => (
                  <View style={[styles.infoBoxWrapper3, { backgroundColor: 'lightgreen' }]} >
                    <TouchableOpacity >
                      {/* <TouchableOpacity onPress={() => pressHandler(item.key)} ></TouchableOpacity>*/}
                      <View style={styles.infoBoxWrapper3}>
                        <View style={[styles.infoBox3, {
                          borderRightWidth: 1, borderRightColor: 'black', marginRight: 1,
                        }]}>
                          <Title>{item.colu1}</Title>

                        </View>
                        <View style={[styles.infoBox3, { borderRightWidth: 1, fontSize: 5, borderRightColor: 'black', }]}>
                          <Title>{item.colu2}</Title>
                        </View>
                      </View>

                    </TouchableOpacity>
                  </View>
                )} />
            </SafeAreaView>


          </View>


          <View style={{ height: 250 }}></View>
        </View></View>
    </ScrollView>
  )
}

export default TeamScreen;

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
    width: '25%',
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
  //container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },


});


/* <TextInput placeholder=" add new" onChangeText={changeHandler} />
            <TextInput placeholder=" add new" onChangeText={changeHandler2} />
            <Button onPress={() => submitHandler(text, name)}
            title="create one" color="green" />*/