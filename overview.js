import React, { useRef, useEffect, useState } from 'react';
import { callService, createConnection, subscribeEntities, createLongLivedTokenAuth, } from "home-assistant-js-websocket";
import { Text, View, TouchableOpacity } from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';
import { styles, colors } from './styles';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnySizeDragSortableView } from 'react-native-drag-sort';
const collection = require("./collection.json")

const Overview = () => {
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
    console.log(item, "state is", data[item].state);
    return (
      <TouchableOpacity
        onPress={() => pressAction(item)}
        style={[styles.entitiesBox, styles[layoutSizes[item].size],
        { backgroundColor: (data[item].state === "on" ? colors.darkBlue : colors.white) }
        ]}
        onLongPress={() => { sortableViewRef.current.startTouch(item, index) }}
        onPressOut={() => { sortableViewRef.current.onPressOut() }}
      >
        <MIcon name={layoutSizes[item].icon} size={iconSizes[layoutSizes[item].size]} color={(data[item].state === "on" ? colors.white : colors.darkBlue)} solid />
        {layoutSizes[item].size != "small" ? <Text>{item}</Text> : null}
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ backgroundColor: colors.white, height: '100%', width: '100%', paddingHorizontal: 20, paddingTop: 40 }}>
      <Text style={styles.title}>Overview</Text>
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
  )
}

export default Overview;