import React, { useRef, useContext, useEffect, useState } from 'react';
import { callService, createConnection, subscribeEntities, createLongLivedTokenAuth, } from "home-assistant-js-websocket";
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { REACT_APP_ACCESS_TOKEN } from '@env';
import { styles, colors } from './styles';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnySizeDragSortableView } from 'react-native-drag-sort';
import { DataContext } from './App';
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg';

const collection = require("./collection.json")

const Overview = () => {
  const { data, connection } = useContext(DataContext)
  const [layoutItems, setLayoutItems] = useState([])
  const [layoutSizes, setLayoutSizes] = useState(collection)
  const { height, width } = Dimensions.get('window');
  const sortableViewRef = useRef();
  const contextMenu = [
    { key: 'foo', title: 'Foo' },
    { isSeparator: true },
    { key: 'bar', title: 'Bar' },
  ]

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
        { backgroundColor: (data[item].state === "on" ? colors.darkBlue : colors.lightGrey) }
        ]}
        onLongPress={() => { sortableViewRef.current.startTouch(item, index) }}
        onPressOut={() => { sortableViewRef.current.onPressOut() }}
      >
        <MIcon name={layoutSizes[item].icon} size={iconSizes[layoutSizes[item].size]} color={(data[item].state === "on" ? colors.white : colors.darkBlue)} solid />
        {layoutSizes[item].size != "small" ? <Text style={{fontWeight:'bold', color: (data[item].state === "on" ? colors.white : colors.darkBlue) }}>{data[item].attributes.friendly_name}</Text> : null}
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Svg height={height} width={width} >
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#4BB8FF" stopOpacity="1" />
            <Stop offset="1" stopColor="#0947DB" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width={width} height={height} fill="url(#grad)" />
      </Svg>

      <View style={styles.mainBg}>
        {/* <View
        contextMenu={contextMenu}
        onContextMenuItemClick={event => {
          console.log(event.nativeEvent)
        }}>
      </View> */}

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
    </View>
  )
}

export default Overview;