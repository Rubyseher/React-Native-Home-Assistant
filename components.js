import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Gradient = () => {
  return (
    <View>
      <Svg height='100%' width='100%' >
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#4BB8FF" stopOpacity="1" />
            <Stop offset="1" stopColor="#0947DB" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width='100%' height='100%' fill="url(#grad)" />
      </Svg>
    </View>
  )
}

export const AutomationBox = (props) => {
  return (
    <TouchableOpacity
    style={[styles.entitiesBox, styles.medium,{ backgroundColor:colors.white }] } >
      <MIcon name="fan" size={30} color={colors.darkBlue} solid />
      <Text style={{ fontWeight: 'bold', color:colors.darkBlue}}>{props.name}</Text>
    </TouchableOpacity>
  )
}