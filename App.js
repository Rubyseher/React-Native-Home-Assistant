import React from 'react';
import { useEffect, useState } from 'react';
import {
  Auth,
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
} from "home-assistant-js-websocket";
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';

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
      {
        data && Object.keys(data).map((item, i) => (
          
          <Text>{item}</Text>
        ))
      }

    </ScrollView>
  );
};
export default App;
