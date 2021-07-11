import React from 'react';
import { useEffect } from 'react';
import {
  Auth,
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
} from "home-assistant-js-websocket";
import {
  Text,
  View,
} from 'react-native';
require('dotenv').config()

const App = () => {
  useEffect(async () => {
    const auth = createLongLivedTokenAuth(
      "http://home.local:8123",
      REACT_APP_ACCESS_TOKEN
    );

    const connection = await createConnection({ auth });
    subscribeEntities(connection, (entities) => {
      console.log(entities["switch.bedlight"]);
    });
  }, [])
  return (
    <View></View>
  );
};
export default App;
