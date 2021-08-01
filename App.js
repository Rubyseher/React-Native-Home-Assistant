import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createConnection, subscribeEntities, createLongLivedTokenAuth, } from "home-assistant-js-websocket";
import { useWindowDimensions } from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import overview from './overview';
import automation from './automation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function OverviewScreen() {
  return (
    <Stack.Navigator initialRouteName="overview" headerMode='none'>
      <Stack.Screen name="overview" component={overview} />
    </Stack.Navigator>
  );
}

function AutomationScreen() {
  return (
    <Stack.Navigator initialRouteName="automation" headerMode='none'>
      <Stack.Screen name="automation" component={automation} />
    </Stack.Navigator>
  );
}

const App = () => {
  const [data, setData] = useState()
  const [layoutItems, setLayoutItems] = useState([])
  const [connection, setConnection] = useState()


  useEffect(() => {
    const loadData = async () => {
      const auth = createLongLivedTokenAuth(
        "http://home.local:8123",
        REACT_APP_ACCESS_TOKEN
      );
      let tempConnection = await createConnection({ auth })
      setConnection(tempConnection)
      subscribeEntities(tempConnection, (entities) => {
        setData(entities)
        setLayoutItems(Object.keys(entities))
      });
    }
    loadData()
  }, [])

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="overview" drawerStyle={{ width: '18%' }} overlayColor="transparent"
        drawerType={useWindowDimensions().width >= 768 ? 'permanent' : 'front'}
      >
        <Drawer.Screen name="overview" component={OverviewScreen} />
        <Drawer.Screen name="automation" component={AutomationScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;
