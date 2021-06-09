import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';


const Theme = ({ navigation }) => {
    const { colors } = useTheme();
    const theme = useTheme();
return(
<View style={{backgroundColor:colors.background}}  >

                <StatusBar backgroundColor="#009387" barStyle={theme.dark ? "light-content" : "dark-content"} />
                    
                       
</View>

)  
}

export default Theme;