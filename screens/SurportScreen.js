import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SurportScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 10, fontWeight:'bold'}}> Surport Screen</Text>
        <Text style={{alignContent:'center', marginLeft:5, marginRight:5, alignItems:'flex-end'}}>
          This is our software group project in L2 . We would be obliged if you could considered 
          this software softly and give your maximum encourrangements to develop further, </Text>
          <Text>
          contact us: 0710000000</Text> 
                <Text style={{fontWeight:'bold'}} >   About us : </Text><Text style={{marginLeft:5, marginRight:5}} >
                  Team Code Freaks :
                    Udari, 
                    Nishan,
                    Sagara, 
                    Supun,
                      Students of the IT faculty of
                    UOM.
        </Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default SurportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});