import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
  ScrollView, Image, Dimensions, FlatList, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Title } from 'react-native-paper';
import FormTeam from './FormTeam';
import FormCoach from './FormCoach';
import Head from './Head';
import Firebase from '../Firebase/firebaseConfig';
import { submitTourlement } from '../Firebase/Teams'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fixtures from './Fixtures';



const TeamScreen = () => {


  const { colors } = useTheme();
  const theme = useTheme();


  const [Id, setId] = React.useState();
  const [TourlementName, setTourlementName] = React.useState();
  const [Status, setStatus] = React.useState();
  const [Sport, setSport] = React.useState();
  const [tourlements, setTourlements] = React.useState();


  const SubmitTourlement = () => {


    if (TourlementName && Sport && Status) {
      if (TourlementName.length > 5 && Sport.length > 5 && Status.length > 4) {
        submitTourlement(Id, '', TourlementName, Sport, Status)
          .then(result => {
            setId(null);
            setTourlementName('');
            setStatus('');
            setSport('')

            setErrors({ errorTou: false });

            alert("Success")
          }).catch(err => {
            console.log(err);
          });
      } else {
        setErrors({ errorTou: true });
      }
    } else {
      
    }

  }

  const SubmitUpdate = () => {


    if (TourlementName && Sport && Status) {
      if (TourlementName.length > 5 && Sport.length > 5 && Status.length > 4) {

        if (Errors.valideAdmin === true) {
          submitTourlement(Id, '', TourlementName, Sport, Status)
            .then(result => {
              setId(null);
              setTourlementName('');
              setStatus('');
              setSport('')
              setErrors({ errorAdmin: false });
              setErrors({ errorTou: false });

              alert("Success")
            }).catch(err => {
              console.log(err);
            });
        } else {
          setErrors({ errorAdmin: true });
        }

      } else {
        setErrors({ errorTou: true });
      }
    } else {

    }

  }

  const [Errors, setErrors] = React.useState({
    errorTou: false,
    valideAdmin: false,
    errorAdmin: false,
  });

  const deleteTourlements = Item => {
    setId(Item.Id);
    if (Errors.valideAdmin === true) {
      Firebase.database()
        .ref('tourelements/' + Item.Id)
        .remove()
        .then(() => {
          Firebase.database()
            .ref('fixtures/' + Item.Id)
            .remove()
            .then(() => {
              setErrors({ errorAdmin: false });
              alert("success deleted tourlement totally");

            }).catch(err => {
              console.log(err);
            })


        }).catch(err => {
          console.log(err);
        })
    } else {
      setErrors({ errorAdmin: true });
    }

  };

  React.useEffect(() => {

    Firebase.database().ref('tourelements')
      .on("value", async (datasnapshot) => {

        new Promise((resolve, reject) => {

          const uuid = Firebase.auth().currentUser.uid;

          datasnapshot.forEach((child) => {
            if (child.val().Id === Id) {
              if (child.val().uid === uuid) {
                setErrors({ valideAdmin: true });
              }
            }

          });
        });

      });
  }, []);
  const updateTourlements = Item => {
    setId(Item.Id);
    setTourlementName(Item.TourlementName);
    setSport(Item.Sport);
    setStatus(Item.Status);
    setErrors({ errorTou: false });

  };
  const ResetTourlements = () => {
    setId(null);
    setTourlementName('');
    setSport('');
    setStatus('');
    setErrors({ errorTou: false });

  };

  const [tourlement, settourlements] = React.useState({
    allUser: []
  });

  React.useEffect(() => {
    Firebase.database().ref('/tourelements')
      .on("value", async (datasnapshot) => {

        new Promise((resolve, reject) => {

          let usersall = [];

          datasnapshot.forEach((child) => {

            usersall.push({
              TourlementName: child.val().TourlementName,
              Sport: child.val().Sport,
              Status: child.val().Status,
              Id: child.val().Id
            });

          });
          settourlements({ allUser: usersall });
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

  }, []);

  return (


    <ScrollView style={styles.container1}>

      <View style={[styles.container1, { backgroundColor: colors.background }]}>


        <View style={{ alignItems: "center", fontSize: 40 }}>

          <Animatable.Image
            animation="bounceIn" duration={10000}
            source={require('../assets/team.jpg')}
            resizeMode={'stretch'} style={[styles.logo, { marginTop: 2 }]} />
        </View>

        <FormTeam />

        <View style={styles.container}>

          <FormCoach />

          <View style={{ height: 50 }}></View>


          <Text style={{ fontFamily: 'Lemon-Regular', fontSize: 17 }} > Create a new Tourlement</Text>
          <SafeAreaView style={{ flex: 1 }}>

            {usertype.userRole === 'Admin' ?
              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1,]}>
                  <Text style={styles.textinput}>Tourlement Name : </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput placeholder="2021 Big Match" style={styles.input}
                    value={TourlementName}
                    onChangeText={(text) => setTourlementName(text)} />
                </View>
              </View> : null}

            {usertype.userRole === 'Admin' ?
              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1, {}]}>
                  <Text style={styles.textinput}>Sport: </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="Cricket"
                    value={Sport}
                    onChangeText={(text) => setSport(text)} />
                </View>
              </View> : null}

            {usertype.userRole === 'Admin' ?
              <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox1,]}>
                  <Text style={styles.textinput}>Status: </Text>
                </View>
                <View style={styles.infoBox2}>
                  <TextInput style={styles.input} placeholder="start"
                    value={Status}
                    onChangeText={(text) => setStatus(text)} />
                </View>
              </View> : null}
            {Errors.errorTou === true ?
              <Animatable.View animation="fadeInRight" duration={500}>
                <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>Inputs not valid.</Text>
              </Animatable.View> : null}
            {Errors.errorAdmin === true ?
              <Animatable.View animation="fadeInRight" duration={500}>
                <Text style={{ color: '#FF1744', marginBottom: 7, margin: 2 }}>You are not created this.</Text>
              </Animatable.View> : null}

            {usertype.userRole === 'Admin' ?
              <View>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => SubmitTourlement()}>
                  <LinearGradient colors={['hotpink', 'lightseagreen']} style={styles.teambutton}  >
                    <Text> Create</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View> : null}
            {usertype.userRole === 'Admin' ?
              <View>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => SubmitUpdate()}>
                  <LinearGradient colors={['hotpink', 'lightseagreen']} style={styles.teambutton}  >
                    <Text> Update</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View> : null}
            {usertype.userRole === 'Admin' ?
              <View>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => ResetTourlements()}>
                  <LinearGradient colors={['pink', 'lightseagreen']} style={styles.teambutton}  >
                    <Text> Reset</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View> : null}

            <Head />
            <FlatList
              alwaysBounceVertical={false}
              data={tourlement.allUser}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <LinearGradient colors={['plum', '#E0F7FA', '#B39DDB', '#7E57C2']} >
                  <View style={[styles.infoBoxWrapper,]} >
                    <TouchableOpacity >
                      <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox5a, styles.boxst, { marginRight: 1 }]}>
                          <Title style={{ fontSize: 15 }}>{item.TourlementName}</Title>
                        </View>
                        <View style={[styles.infoBox5b, styles.boxst]}>
                          <Title style={{ fontSize: 17 }}>{item.Sport}</Title>
                        </View>
                        <View style={[styles.infoBox5b, styles.boxst]}>
                          <Title style={{ fontSize: 17 }}>{item.Status}</Title>
                        </View>

                        {usertype.userRole === 'Admin' ?
                          <View style={[styles.infoBox5c, styles.boxst]}>
                            <TouchableOpacity onPress={() => deleteTourlements(item)} >
                              <Icon name="delete" color="#777777" size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateTourlements(item)}>
                              <Icon name="pencil-outline" color="#777777" size={30} />
                            </TouchableOpacity>

                          </View>
                          :
                          <View style={[styles.infoBox5c, styles.boxst]}>
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


            <View style={{ height: 50 }}></View>
            <Fixtures />

          </SafeAreaView>
          <View style={{ height: 150 }}></View>
        </View>
      </View>
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
  boxst: {
    borderRightWidth: 0.5,
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderTopColor: 'black'
  },

  logo: {
    width: height_logo * 2,
    height: height_logo,
  },
  input: {
    borderWidth: 1.3,
    borderColor: 'purple',
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
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox2: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    borderWidth: 0.2,
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
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
});
