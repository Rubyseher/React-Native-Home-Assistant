import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { styles, colors } from './styles';
import { Gradient,AutomationBox } from './components';

const Automation = () => {
  return (
    <View>
      <Gradient />
      <View style={styles.mainBg}>
        <Text style={styles.title}>Automation</Text>
        <AutomationBox/>
      </View>
    </View>
  )
}

export default Automation;