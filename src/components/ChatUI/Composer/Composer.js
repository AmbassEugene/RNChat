'use strict'

import React, { Component } from 'react'
import { Image, TextInput, Platform, TouchableOpacity, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AppStyles from '../../../config/styles'
import styles from './styles'

const iosTextHeight = 21
const androidTextHeight = 21
const textHeight = Platform.OS === 'ios' ? iosTextHeight : androidTextHeight

export default class Composer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: null,
      toggleComposerStyle: styles.composerHidden,
      height: textHeight * 2,
      lines: 1,
      activateEmoji: false
    }
  }

  handleTextInputSizeChanged(event) {
    const height = Platform.OS === 'ios'
      ? event.nativeEvent.contentSize.height
      : event.nativeEvent.contentSize.height - androidTextHeight
    const lines = Math.round(height / textHeight)
    const visibleLines = lines < 6 ? lines : 6
    const visibleHeight = textHeight * (visibleLines + 1)
    this.setState({ height: visibleHeight, lines: visibleLines })
  }

  render() {
    const {
      activateEmoji,
      emojiCallback,
      handleTextChanged,
      text,
      activateAttach,
      attachCallback,
      onComposerPressed } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.inputBoxView}>

          <TouchableOpacity onPress={() => emojiCallback(!activateEmoji)}>
            <FontAwesomeIcon
              size={24}
              color={AppStyles.colors.inactiveGreyColor}
              style={{ marginRight: 10, marginBottom: 8 }}
              name={activateEmoji ? "keyboard-o" : "smile-o"}
            />
          </TouchableOpacity>

          <TextInput
            onFocus={() => emojiCallback(false)}
            style={[styles.inputBox, { height: this.state.height }]}
            value={this.state.text}
            returnKeyLabel={"next"}
            onChangeText={handleTextChanged}
            editable
            multiline
            value={text}
            onContentSizeChange={(e) => this.handleTextInputSizeChanged.bind(this)(e)}
          />
          <TouchableOpacity onPress={() => attachCallback(!activateAttach)}>
            <EntypoIcon
              size={24}
              color={AppStyles.colors.inactiveGreyColor}
              style={{ transform: [{ rotate: '-90deg' }], marginBottom: 8 }}
              name="attachment"
            />
          </TouchableOpacity>
        </View>

        {
          text ?
            <TouchableOpacity onPress={() => onComposerPressed(null)}>
              <Image source={require('../../../assets/images/send.png')} style={styles.composer} />
            </TouchableOpacity>
            : null
        }
      </View>
    )
  }
}
