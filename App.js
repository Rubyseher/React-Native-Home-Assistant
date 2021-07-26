import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Auth, createConnection, subscribeEntities, createLongLivedTokenAuth, } from "home-assistant-js-websocket";
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';
import { styles, colors } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DragSortableView, AutoDragSortableView, AnySizeDragSortableView } from 'react-native-drag-sort';



const App = () => {
  const [data, setData] = useState()
  const [layoutItems, setLayoutItems] = useState([])
  const sortableViewRef = useRef();
  useEffect(async () => {
    const auth = createLongLivedTokenAuth(
      "http://home.local:8123",
      REACT_APP_ACCESS_TOKEN
    );

    const connection = await createConnection({ auth });
    subscribeEntities(connection, (entities) => {
      setData(entities)
      setLayoutItems(Object.keys(entities))
    });
  }, [])

  const _renderItem = (item, index, isMoved) => {
    return (
      <TouchableOpacity style={styles.entitiesBox}
        onLongPress={() => { sortableViewRef.current.startTouch(item, index) }}
        onPressOut={() => { sortableViewRef.current.onPressOut() }}
      >
        <Icon name="lightbulb" size={70} color={colors.darkBlue} solid />
        <Text>{item}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ backgroundColor: colors.lightGrey, height: '100%', width: '100%' ,paddingHorizontal:'6%'}}>

      {/* <View style={styles.entitiesContainer}> */}
        {data && <AnySizeDragSortableView 
          ref={sortableViewRef}
          dataSource={layoutItems.filter(function (item) {
            return (item.split(".")[0] === "scene" || item.split(".")[0] === "switch");
          })}
          keyExtractor={(item, i) => i}
          renderItem={_renderItem}
          onDataChange={(d, callback) => {
            console.log(d);
            setLayoutItems(d);
            callback();
          }}
        />
        }
      {/* </View> */}

      {/* <View style={styles.entitiesContainer}>
        {
          data && Object.keys(data).filter(function (item) {
            return (item.split(".")[0] === "scene" || item.split(".")[0] === "switch");
          }).map((item, k) => (
            <View key={k} style={styles.entitiesBox}>
              <Icon name="lightbulb" size={70} color={colors.darkBlue} solid />
              <Text>{item}</Text>
            </View>
          ))
        }
      </View> */}
    </View>
  );
};
export default App;
