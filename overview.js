import React, { useRef, useContext, useEffect, useState } from 'react';
import { callService, createConnection, subscribeEntities, createLongLivedTokenAuth, } from "home-assistant-js-websocket";
import { Text, View, TouchableOpacity } from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';
import { styles, colors } from './styles';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnySizeDragSortableView } from 'react-native-drag-sort';
import { DataContext } from './App';
import { Gradient } from './components';
const collection = require("./collection.json")

const Overview = () => {
  const { data, connection } = useContext(DataContext)
  const [layoutItems, setLayoutItems] = useState([])
  const [layoutSizes, setLayoutSizes] = useState(collection)
  const sortableViewRef = useRef();

  useEffect(() => {
    data && setLayoutItems(Object.keys(data))
  }, [data])

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
        style={[styles.entitiesBox, styles[layoutSizes[item].size],
        { backgroundColor: (data[item].state === "on" ? colors.white90 : colors.white50) }
        ]}
        onLongPress={() => { sortableViewRef.current.startTouch(item, index) }}
        onPressOut={() => { sortableViewRef.current.onPressOut() }}
      >
        <MIcon name={layoutSizes[item].icon} size={iconSizes[layoutSizes[item].size]} color={(data[item].state === "on" ? colors.darkBlue : colors.white)} solid />
        {layoutSizes[item].size != "small" ? <Text style={{fontWeight:'bold', color: (data[item].state === "on" ? colors.darkBlue : colors.white) }}>{data[item].attributes.friendly_name}</Text> : null}
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Gradient />
      <View style={styles.mainBg}>
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
              setLayoutItems(d);
              callback();
            }}
          />
        }
      </View>
    </View>
  )
}

export default Overview;