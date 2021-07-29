import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Auth, createConnection, subscribeEntities, createLongLivedTokenAuth, } from "home-assistant-js-websocket";
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';
import { styles, colors } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnySizeDragSortableView } from 'react-native-drag-sort';

const collection = require("./collection.json")

const App = () => {
  const [data, setData] = useState()
  const [layoutItems, setLayoutItems] = useState([])
  const [layoutSizes, setLayoutSizes] = useState(collection)
  const sortableViewRef = useRef();
  useEffect(() => {
    const loadData = async () => {
      const auth = createLongLivedTokenAuth(
        "http://home.local:8123",
        REACT_APP_ACCESS_TOKEN
      );

      const connection = await createConnection({ auth });
      subscribeEntities(connection, (entities) => {
        setData(entities)
        setLayoutItems(Object.keys(entities))
      });
    }
    loadData()
  }, [])

  const _renderItem = (item, index, isMoved) => {
    const iconSizes = { small: 40, medium: 50, large: 60 }
    const contextMenu = [
      { key: 'foo', title: 'Foo' },
      { isSeparator: true },
      { key: 'bar', title: 'Bar' },
    ]

    return (
      <TouchableOpacity
        contextMenu={contextMenu}
        onContextMenuItemClick={event => {
          console.log(event.nativeEvent)
        }}
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
    <View style={{ backgroundColor: colors.white, height: '100%', width: '100%', paddingHorizontal: 20, paddingTop: 40 }}>
      <Text style={styles.title}>Dashboard</Text>
      {
        data && <AnySizeDragSortableView
        movedWrapStyle={styles.entitiesBox}
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
    </View>
  );
};
export default App;
