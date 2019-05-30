'use strict'

import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import UserItem from '../components/UserItem'

export default class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
    headerTitleStyle: { alignSelf: 'center' }
  }

  constructor(props) {
    super(props)

    this.state = {
      users: [
        { id: 0, name: "Adilai", timeLabel: "now", status: true, icons: ['circle-medium'], image: "https://bootdey.com/img/Content/avatar/avatar1.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 1, name: "CHARLOTTE", timeLabel: "15m", status: true, icons: ['call', 'circle-medium'], image: "https://bootdey.com/img/Content/avatar/avatar2.png", msg: { missed: true, text: "Missed Call" } },
        { id: 2, name: "Tamas", timeLabel: "15m", status: false, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar3.png", msg: { missed: false, text: "How are you?" } },
        { id: 3, name: "SOPHIA Down", timeLabel: "8m 23s", status: true, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar4.png", msg: { missed: false, text: "Lorem lpsum is simply dummy text" } },
        { id: 4, name: "OLIVIA", timeLabel: "10m 30s", status: false, icons: ['call', 'videocam', 'circle-medium'], image: "https://bootdey.com/img/Content/avatar/avatar5.png", msg: { missed: true, text: "Missed Call" } },
        { id: 5, name: "John Doe", timeLabel: "20m", status: false, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar6.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 6, name: "Ping L", timeLabel: "1h 40m", status: true, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar2.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 7, name: "John Doe", timeLabel: "2h 0m", status: false, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar1.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 8, name: "John Doe", timeLabel: "3h 30m", status: true, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar4.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 9, name: "John Doe", timeLabel: "5h 10m", status: true, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar7.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 10, name: "John Doe", timeLabel: "5h 10m", status: true, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar7.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 11, name: "John Doe", timeLabel: "5h 10m", status: true, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar7.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 12, name: "John Doe", timeLabel: "5h 10m", status: true, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar7.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 13, name: "John Doe", timeLabel: "5h 10m", status: true, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar7.png", msg: { missed: false, text: "Kelly sent a sticker" } },
        { id: 14, name: "John Doe", timeLabel: "5h 10m", status: true, icons: [], image: "https://bootdey.com/img/Content/avatar/avatar7.png", msg: { missed: false, text: "Kelly sent a sticker" } },
      ]
      ,

    }
  }

  handleUserPressed(user) {
    this.props.navigation.navigate('ChatStack', { user: user })
  }

  handlePress = (string, data) => {

    if (string === 'chat') {
      this.props.navigation.navigate('ChatStack', { user: data })
      return
    }

    this.props.navigation.navigate('Camera', { callBack: () => console.log('object') })
    return
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <SwipeListView
          useFlatList
          data={this.state.users}
          keyExtractor={user => user.id.toString()}
          renderItem={({ item }) => (
            <UserItem user={item} onPress={this.handleUserPressed.bind(this)} />
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <Text
                style={styles.left}
                onPress={() => this.handlePress('chat', data.item)}>Chat</Text>
              <Text
                style={styles.right}
                onPress={() => this.handlePress('call', data.item)}>Video call</Text>
            </View>
          )}
          // leftOpenValue={0}
          rightOpenValue={-190}
          disableRightSwipe
          closeOnRowPress
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // marginRight: -20
  },
  left: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: 25
  },
  right: {
    padding: 25,
    backgroundColor: "#9c27b0",
    color: "#fff"
  },


});
