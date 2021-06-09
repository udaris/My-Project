import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, Modal, } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import EditProfile from './EditProfile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '../Firebase/firebaseConfig';

import { launchImageLibrary } from 'react-native-image-picker';
import { UpdateProfileImage } from '../Firebase/Users';
import ImgToBase64 from 'react-native-image-base64';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ProfileScreen extends Component {

  state = {
    userEmail: '',
    addTodoVisible: false,
    allUsers: [],
    imageUrl: '',
    userRole: '',
    loader: false,
    userfirstName: ' Your Name',
    userTP: 'Your mobie number',
    usercaddress: 'your current address',
    userID: 'user token'
  };

  async componentDidMount() {
    try {
      await Firebase.database().ref('users')
        .on("value", async (datasnapshot) => {

          new Promise((resolve, reject) => {

            const uuid = Firebase.auth().currentUser.uid;
            console.log('uuid', uuid);

            datasnapshot.forEach((child) => {

              if (child.val().uuid === uuid) {
                this.setState({
                  userEmail: child.val().email,
                  imageUrl: child.val().image,
                  userRole: child.val().userRole

                })
              }

            });
          });

        })

    } catch (error) {
      alert(error);
    }

    try {
      await Firebase.database().ref('usersDetails')
        .on("value", async (datasnapshot) => {

          new Promise((resolve, reject) => {

            const uuid = Firebase.auth().currentUser.uid;

            datasnapshot.forEach((child) => {

              if (child.val().Id === uuid) {
                this.setState({
                  userfirstName: child.val().firstName,
                  usersName: child.val().secondName,
                  userTP: child.val().tpnumber,
                  usercaddress: child.val().currentAddress,
                  userMedidetails: child.val().medicalDetails,
                  userwinners: child.val().winners,
                  userskills: child.val().strengths,
                  userexperienes: child.val().experiences,
                  userotherQualifications: child.val().otherqualifications,
                  usersport: child.val().sport,
                  userID: child.val().Id,
                  userage:child.val().age

                })
              }

            });
          })
        });
    } catch (error) {
      alert(error);
    }


  }

  openGallery() {
    launchImageLibrary('photo', (response) => {

      this.setState({ loader: true });
      ImgToBase64.getBase64String(response.uri)

        .then(async (base64String) => {
          const uid = Firebase.auth().currentUser.uid;
          let source = "data:image/jpeg;base64," + base64String;
          UpdateProfileImage(source, uid)

            .then(() => {
              this.setState({ imageUrl: response.uri, loader: false });
            })
        })
        .catch(err => this.setState({ loader: false }));
    })
  }


  toggleEditProfile() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>

          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <TouchableOpacity onPress={() => { this.openGallery() }}>
                <Avatar.Image
                  source={{ uri: this.state.imageUrl === '' ? 'https://api.adorable.io/avatars/80/abott@adorable.png' : this.state.imageUrl }}
                  size={80} style={{ height: 80, width: 80 }} />
              </TouchableOpacity>
              <View style={{ marginLeft: 20 }}>
                <Title style={[styles.title, { marginTop: 15, marginBottom: 5, }]}>{this.state.userfirstName} {this.state.usersName}</Title>
                <Caption style={styles.caption}> user</Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{this.state.usercaddress}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{this.state.userTP}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{this.state.userEmail}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="tag" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{this.state.userID}</Text>
            </View>
            <View style={styles.row}>

              <Modal animationType='slide'
                visible={this.state.addTodoVisible}
                onRequestClose={() => this.toggleEditProfile()} >
                <EditProfile closeModal={() => this.toggleEditProfile()}
                />
              </Modal>

              <View>
                <TouchableOpacity onPress={() => this.toggleEditProfile()} >
                  <View style={{ backgroundColor: 'lightblue' }} >
                    <Text style={[{ fontWeight: 'bold' }]}> Edit profile</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
          {this.state.userRole === 'parent' ? null :
            <View style={styles.infoBoxWrapper}>
              <View style={[styles.infoBox, { borderRightColor: '#dddddd', borderRightWidth: 1 }]}>
                <Title> Team </Title>
                <Caption>{this.state.usersport}</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title>{this.state.userRole} </Title>
                <Caption>Fixtures/Events</Caption>
              </View>
            </View>}

          {this.state.userRole === 'parent' ? null :

            <View style={styles.menuWrapper}>

              <TouchableRipple>
                <View style={styles.menuItem}>
                  <Icon name="medical-bag" color="#FF6347" size={25} />
                  <Text style={styles.menuItemText}>Medical details </Text>
                </View>
              </TouchableRipple>
              <Text style={{ left: 35, marginTop: 1 }}>{this.state.userMedidetails}</Text>

              <TouchableRipple onPress={() => { }}>
                <View style={styles.menuItem}>
                  <Icon name="trophy-outline" color="#FF6347" size={25} />
                  <Text style={styles.menuItemText}>Your winners</Text>
                </View>
              </TouchableRipple>
              <Text style={{ left: 35, marginTop: 3 }}>{this.state.userwinners}</Text>

              <TouchableRipple onPress={() => { }}>
                <View style={styles.menuItem}>
                  <Icon name="crown-outline" color="#FF6347" size={25} />
                  <Text style={styles.menuItemText}>Skills</Text>
                </View>
              </TouchableRipple>
              <Text style={{ left: 35, marginTop: 3 }}>{this.state.userskills}</Text>

              <TouchableRipple onPress={() => { }}>
                <View style={styles.menuItem}>
                  <Icon name="account-check-outline" color="#FF6347" size={25} />
                  <Text style={styles.menuItemText}>Sport(s)</Text>
                </View>
              </TouchableRipple>
              <Text style={{ left: 35, marginTop: 3 }}>{this.state.usersport}</Text>

              <TouchableRipple onPress={() => { }}>
                <View style={styles.menuItem}>
                  <Icon name="crown" color="#FF6347" size={25} />
                  <Text style={styles.menuItemText}>Experiences </Text>
                </View>
              </TouchableRipple>
              <Text style={{ left: 35, marginTop: 3 }}>{this.state.userexperienes}</Text>
              <TouchableRipple onPress={() => { }}>
                <View style={styles.menuItem}>
                  <Icon name="badge-account-horizontal-outline" color="#FF6347" size={25} />
                  <Text style={styles.menuItemText}>Other Qualifications </Text>
                </View>
              </TouchableRipple>
              <Text style={{ left: 35, marginTop: 3 }}>{this.state.userotherQualifications}</Text>
            </View>
          }
          <View style={{ height: 150 }}></View>
        </SafeAreaView>
      </ScrollView>
    );
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});


