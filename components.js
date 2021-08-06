import React from 'react';
import { Text, View, Dimensions,TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Gradient = () => {
  const { height, width } = Dimensions.get('window');
  return (
    <View>
      <Svg height={height} width={width} >
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#4BB8FF" stopOpacity="1" />
            <Stop offset="1" stopColor="#0947DB" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width={width} height={height} fill="url(#grad)" />
      </Svg>
    </View>
  )
}

export const AutomationBox = () => {
  return (
    <TouchableOpacity
      style={[styles.entitiesBox, styles.large],
      { backgroundColor:colors.white}
      }
    >
      <MIcon name="fan" size={30} color={colors.darkBlue} solid />
      <Text style={{ fontWeight: 'bold', color:colors.darkBlue}}>hi</Text>
    </TouchableOpacity>
  )
}