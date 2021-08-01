import React, { Fragment, useRef, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { callService, createConnection, subscribeEntities, createLongLivedTokenAuth, } from "home-assistant-js-websocket";
import { useWindowDimensions, Button, Text, View, TouchableOpacity } from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';
import { styles, colors } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnySizeDragSortableView } from 'react-native-drag-sort';
import { NavigationContainer } from '@react-navigation/native';
import test1 from './test1';
import test2 from './test2';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const collection = require("./collection.json")
const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="test1" headerMode='none'>
      <Stack.Screen name="test1" component={test1} />
    </Stack.Navigator>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="test2" headerMode='none'>
      <Stack.Screen name="test2" component={test2} />
    </Stack.Navigator>
  );
}

const App = ({ navigation }) => {
  const [data, setData] = useState()
  const [layoutItems, setLayoutItems] = useState([])
  const [connection, setConnection] = useState()
  const [layoutSizes, setLayoutSizes] = useState(collection)
  const sortableViewRef = useRef();

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

  const _renderItem = (item, index, isMoved) => {
    const iconSizes = { small: 40, medium: 50, large: 60 }
    const pressAction = (item) => {
      if (["switch", "light", "input_boolean"].includes(item.split(".", 1)[0]))
        callService(connection, "homeassistant", "toggle", { entity_id: item })
      else if (["scene"].includes(item.split(".", 1)[0]))
        callService(connection, "homeassistant", "turn_on", { entity_id: item })
    }
    return (
      <TouchableOpacity
        onPress={() => pressAction(item)}
        style={[styles.entitiesBox, styles[layoutSizes[item].size]]}
        onLongPress={() => { sortableViewRef.current.startTouch(item, index) }}
        onPressOut={() => { sortableViewRef.current.onPressOut() }}
      >
        <MIcon name={layoutSizes[item].icon} size={iconSizes[layoutSizes[item].size]} color={colors.darkBlue} solid />
        {layoutSizes[item].size != "small" ? <Text>{item}</Text> : null}
      </TouchableOpacity>
    )
  }

  return (
    // <View style={{ backgroundColor: colors.white, height: '100%', width: '100%', paddingHorizontal: 20, paddingTop: 40 }}>
    //   <Text style={styles.title}>Dashboard</Text>
    //   <View style={styles.entitiesBox} >
    //     <Text>hi</Text>
    //   </View>
    //   {
    //     data && <AnySizeDragSortableView
    //       movedWrapStyle={styles.entitiesBox}
    //       ref={sortableViewRef}
    //       dataSource={layoutItems.filter(function (item) {
    //         return (item.split(".")[0] === "scene" || item.split(".")[0] === "switch");
    //       })}
    //       keyExtractor={(item, i) => i}
    //       renderItem={_renderItem}
    //       onDataChange={(d, callback) => {
    //         console.log(d);
    //         setLayoutItems(d);
    //         callback();
    //       }}
    //     />
    //   }
    // </View>

    <NavigationContainer>
      <Drawer.Navigator initialRouteName="test1" drawerStyle={{ width: '18%' }}
        drawerType={useWindowDimensions().width >= 768 ? 'permanent' : 'front'}
        overlayColor="transparent"
      >
        <Drawer.Screen name="test1" component={HomeScreen} />
        <Drawer.Screen name="test2" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;
