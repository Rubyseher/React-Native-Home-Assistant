import React from 'react';
import { ScrollView,Button, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../styles';

const test1 = () => {
  return (
    <View>
       <Text style={{fontSize:90,textAlign:'center',width:'100%',color:colors.darkBlue}}>test 1</Text>
    </View>
  )
}

export default test1;