'use strict'

import React, { Component } from 'react'

import { View, Text, FlatList, ScrollView, StyleSheet, Alert } from 'react-native'
import EmojiSelector from 'react-native-emoji-selector';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LeftNav from '../components/ChatUI/ChatNavBar/LeftNav'
import RightNav from '../components/ChatUI/ChatNavBar/RightNav'
import ChatItem from '../components/ChatUI/ChatItem'
import { currentDateTimeString } from '../config/datetime'
import AppStyles from '../config/styles'
import Composer from '../components/ChatUI/Composer'
import { attachMenu } from '../config/staticData';
import fake from '../assets/images/avatar.png'
import AttachIcons from '../components/AttachIcons/AttachIcons';
import Gifs from '../components/Gifs/Gifs';
import axios from 'axios';
import { giphyKey } from '../config/secrets';

export default class ChatScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user', {})
    return {
      title: user.name,
      headerLeft: <LeftNav user={user} navigation={navigation} />,
      headerRight: <RightNav />
    }
  }

  constructor(props) {
    super(props)
    const user = this.props.navigation.getParam('user', {})

    this.myRef = React.createRef()

    this.state = {
      messages: [
        { _id: 0, user: null, text: "hello", createdAt: '2019-05-23 10:20:30' },
        { _id: 1, user: user, text: "Halo John, terima kasih atas pesan Anda. Kami sedang tidak berada di sini sekearang, tapi kami akan kembali kepada Anda secepatnya!", createdAt: '2019-05-23 12:30:45' }
      ],
      activateEmoji: false,
      text: "",
      activateAttach: false,
      imgURI: false,
      emoticons: true,
      gifs: false,
      giphyData: null,
      gif: null
    }
  }

  sendMessage(URI) {
    const currentDateTime = currentDateTimeString()
    var messages = this.state.messages
    messages.push({
      _id: messages.length,
      user: null,
      text: this.state.text,
      imgURI: URI || null,
      createAt: currentDateTime
    })
    this.setState({
      messages: messages,
      text: "",
      activateEmoji: false,
      activateAttach: false,
      imgURI: false,
      gif: null
    })
    // this.myRef.current.scrollToEnd()
  }

  renderHeader() {
    return (
      <Text style={styles.header}>
        MAY 23 AT 19:04
      </Text>
    )
  }

  activateEmojiPanel = (status) => {
    this.setState({ activateEmoji: status, activateAttach: false })
  }

  activateAttachPanel = (status) => {
    this.setState({ activateEmoji: false, activateAttach: status })
  }


  handleAttachAction = (name) => {
    switch (name.toLowerCase()) {
      case "camera":
        this.props.navigation.navigate('Camera', {
          callBack: this.saveImg,
        })
        this.setState({ activateAttach: false })
        return

      default:
        Alert.alert(
          'Alert Title',
          name + " was clicked",
          [
            { text: 'OK', onPress: () => this.setState({ activateAttach: false }) },
          ],
          { cancelable: false },
        );
        break
    }
  }

  saveImg = (URI, source) => {
    if (source === 'gifs') {
      console.log(URI)
      this.setState({ gif: URI })
    } else {
      this.setState({ imgURI: URI })
    }
    this.sendMessage(URI)
  }

  changeEmoticon = (emotype) => {
    if (emotype === 'gifs') {
      this.setState({ gifs: true, emoticons: false })

      fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${giphyKey}`)
        .then(res => res.json())
        .then(data => this.setState({ giphyData: data.data }))
      return
    }
    this.setState({ emoticons: true, gifs: false })
  }


  render() {
    const { activateEmoji, text, activateAttach, giphyData, emoticons, gifs } = this.state

    return (
      <View style={styles.container}>
        <ScrollView ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true })
            console.log("new Width: ", contentWidth, "New Height", contentHeight)
          }}
        >
          <FlatList
            data={this.state.messages}
            extraData={this.state}
            showVerticalScrollIndicator={false}
            keyExtractor={message => message._id.toString()}
            ListHeaderComponent={this.renderHeader}
            renderItem={({ item }) => (
              <ChatItem key={item._id} message={item} />
            )}
          />

        </ScrollView>

        {activateEmoji ?
          <View style={styles.emojiView}>
            <View style={styles.selectPanel}>
              <FontAwesomeIcon
                size={24}
                color={emoticons ? '#0084ff' : AppStyles.colors.inactiveGreyColor}
                style={{ padding: 5, marginRight: 10 }}
                name="smile-o"
                onPress={() => this.changeEmoticon('emoticons')}
              />
              <MaterialIcons
                size={30}
                color={gifs ? '#0084ff' : AppStyles.colors.inactiveGreyColor}
                style={{ padding: 5 }}
                name={"gif"}
                onPress={() => this.changeEmoticon('gifs')}
              />

            </View>

            {emoticons ?
              <EmojiSelector
                showSearchBar={false}
                columns={9}
                onEmojiSelected={emoji => this.setState({ text: text + emoji })}
              />
              :
              <ScrollView contentContainerStyle={styles.gifContainer}>
                {giphyData ?
                  giphyData.map((gif, index) => {
                    return (
                      <Gifs
                        key={index}
                        // data={gif.images.fixed_height.url}
                        imgSrc={gif.images.fixed_height.url}
                        sendGif={this.saveImg}
                      />
                    )
                  })
                  :
                  <Text>Wait a moment... Preparing your gifs</Text>
                }


              </ScrollView>
            }

          </View>
          : null
        }
        {
          activateAttach ?
            <View style={{ alignItems: 'center', width: '100%' }}>
              <View style={styles.attachPanel}>
                {
                  attachMenu.map((menu, index) => {
                    return (
                      <AttachIcons
                        key={index}
                        name={menu.name}
                        iconName={menu.icon_name}
                        callBack={() => this.handleAttachAction(menu.name)}
                      />
                    )
                  })

                }
              </View>
            </View>
            : null
        }

        <Composer
          onComposerPressed={this.sendMessage.bind(this)}
          emojiCallback={this.activateEmojiPanel}
          activateEmoji={activateEmoji}
          handleTextChanged={text => this.setState({ text })}
          text={text}
          activateAttach={activateAttach}
          attachCallback={this.activateAttachPanel}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    backgroundColor: AppStyles.colors.white,
  },
  header: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 20,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaaaaa',
  },
  separator: {
    height: 1,
    width: '86%',
    backgroundColor: '#ced0ce',
    marginLeft: '14%'
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ced0ce'
  },
  emojiView: {
    position: "absolute",
    bottom: 20,
    height: 350,
    elevation: 1,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ced0ce',
    width: '100%'
  },
  attachPanel: {
    position: "absolute",
    bottom: 5,
    width: '95%',
    backgroundColor: '#fff',
    justifyContent: "center",
    paddingTop: 20,
    paddingRight: 25,
    paddingBottom: 20,
    borderRadius: 10,
    paddingLeft: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 1,
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  selectPanel: {
    position: "absolute",
    bottom: 40,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ced0ce'
  },
  gifContainer: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
})
