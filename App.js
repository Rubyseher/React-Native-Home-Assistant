import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createConnection, subscribeEntities, createLongLivedTokenAuth, Connection } from "home-assistant-js-websocket";
import { useWindowDimensions, View } from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Overview from './overview';
import Automation from './automation';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from './styles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export const DataContext = React.createContext();

function OverviewScreen() {
  return (
    <Stack.Navigator initialRouteName="Overview" headerMode='none'>
      <Stack.Screen name="Overview" component={Overview} />
    </Stack.Navigator>
  );
}

function AutomationScreen() {
  return (
    <Stack.Navigator initialRouteName="Automation" headerMode='none'>
      <Stack.Screen name="Automation" component={Automation} />
    </Stack.Navigator>
  );
}

const App = () => {
  const [data, setData] = useState()
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
      });
    }
    loadData()
  }, [])

  return (
    <DataContext.Provider value={{ data, connection }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Automation" drawerStyle={{ width: '6%'}} overlayColor="transparent"
          drawerType={useWindowDimensions().width >= 768 ? 'permanent' : 'front'}
          
          screenOptions={({ route }) => ({
            drawerIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Overview') {
                iconName ='home'
              } else if (route.name === 'Automation') {
                iconName='color-wand-outline';
              }
              return <Icon name={iconName} size={44} color={focused?colors.purple:colors.darkBlue} />;
            },
            drawerLabel: () => null,
          })}
        >
          <Drawer.Screen name="Overview" component={OverviewScreen} />
          <Drawer.Screen name="Automation" component={AutomationScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
};
export default App;
