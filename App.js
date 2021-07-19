import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { Auth, createConnection, subscribeEntities, createLongLivedTokenAuth, } from "home-assistant-js-websocket";
import { ScrollView, Text, View } from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';
import { styles, colors } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';

const App = () => {
  const [data, setData] = useState()

  useEffect(async () => {
    const auth = createLongLivedTokenAuth(
      "http://home.local:8123",
      REACT_APP_ACCESS_TOKEN
    );

    const connection = await createConnection({ auth });
    subscribeEntities(connection, (entities) => {
      setData(entities)
    });

  }, [])
  return (
    <ScrollView>
      {/* {
        data && Object.keys(data).filter(function (item) {
          return (item.split(".")[0] === "scene" || item.split(".")[0] === "switch");
        }).map((item) => (
          // <View style={styles.entitiesBox}>
            <Text>{item}</Text>
          // </View>
        ))
      } */}
      <Icon name="lightbulb" size={120} color={colors.darkBlue} solid />

    </ScrollView>
  );
};
export default App;
