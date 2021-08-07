import React, { useEffect, useContext, useState } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { styles, colors } from './styles';
import { Gradient, AutomationBox } from './components';
import { DataContext } from './App';

const Automation = () => {
  const { data, connection } = useContext(DataContext)
  const [layoutItems, setLayoutItems] = useState([])

  useEffect(() => {
    data && setLayoutItems(Object.keys(data).filter(function (item) {
      return (item.split(".")[0] === "automation");
    }))
  }, [data])

  return (
    <View>
      <Gradient />
      <View style={styles.mainBg}>
        <Text style={styles.title}>Automation</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap',width:'100%'}}>
          {
            layoutItems.length > 0 && layoutItems.map((item, i) => (
              <AutomationBox name={data[item].attributes.friendly_name}/>
            ))
          }
        </View>
      </View>
    </View>
  )
}

export default Automation;