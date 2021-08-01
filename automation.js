import React from 'react';
import { Text, View } from 'react-native';
import { styles, colors } from './styles';

const Automation = () => {
  return (
    <View style={{ backgroundColor: colors.white, height: '100%', width: '100%', paddingHorizontal: 20, paddingTop: 40 }}>
      <Text style={styles.title}>Automation</Text>
    </View>
  )
}

export default Automation;