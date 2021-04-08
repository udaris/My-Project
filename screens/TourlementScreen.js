import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { Button } from 'react-native-share';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient'; 

export default class TourlementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['ID ', 'Team Name', 'Coach',  'State','Players',],
      tableData: [
        ['1', 'Team 01', 'Mr. Ekanayaka', '6','6',],
        ['2', 'Team 02', 'Mr. Shyamika ', 'd','8'],
        ['3', 'Team 03', 'Mr. Krishantha', 'a','6'],
        ['4', 'Team 04', 'Mr. Madhushanka', '4','6']
      ]
    }                                                                                      
  }
                         
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }
 
  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Remove</Text>
        </View>
      </TouchableOpacity>
    );
 
    return (


      <ScrollView>
      <View style={styles.container}>

      <Text style={{fontWeight:'bold'}} >Tourlement Details</Text><Text style={{padding:0.1}}></Text>
     
     <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox1, {
              
            }]}>
             <Text style={styles.textinput}>Team Name : </Text>
            </View>
            <View style={styles.infoBox2}> 
            <TextInput style={styles.input} /> 
            </View>
        </View>

        <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox1, {
              
            }]}>
             <Text style={styles.textinput}>Coach : </Text>
            </View>
            <View style={styles.infoBox2}> 
            <TextInput style={styles.input} /> 
            </View>
        </View>

        <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox1, {
              
            }]}>
             <Text style={styles.textinput}>Sturcture : </Text>
            </View>
            <View style={styles.infoBox2}> 
            <TextInput style={styles.input} /> 
            </View>
        </View>

        <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox1, {
              
            }]}>
             <Text style={styles.textinput}>Number of Players : </Text>
            </View>
            <View style={styles.infoBox2}> 
            <TextInput style={styles.input} /> 
            </View>
        </View>

          <View>
          <TouchableOpacity >
          <LinearGradient colors={['#2f4f4f','#ff1493' ]} style={styles.teambutton}  >
          <Text> Add a team </Text>  
          </LinearGradient>
         </TouchableOpacity></View>

        <Table borderStyle={{borderColor: 'transparent', borderWidth:10 }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} borderStyle={{borderWidth:15}} />
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View></ScrollView>
    )
  }
}
 
const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderColor:'green',
    padding:8,
    margin:10,
    width:150,
    paddingLeft:50,
    paddingRight:150
  },
  textin:{
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
  teambutton:{
    width:120,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:70,
    flexDirection:'row',
    margin:5,
  },

  textInput:{
    flex:1,
    backgroundColor:'lightyellow',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'black',
    marginRight:75,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
  },
  button:{

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
    
});



/*function TeamScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text style={styles.container}>Team Screen</Text><Text></Text>
        <Button title="Go to Home  Screen " 
        onPress={()=>navigation.navigate("Home")}/>


        
     </View>
    );
  }

  export default TeamScreen;

const styles =StyleSheet.create({
 container:{
     fontSize: 20,
 }
  })*/