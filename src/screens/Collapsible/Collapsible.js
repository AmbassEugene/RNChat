import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import SimpleAccordion from '../../components/SimpleAccordion/SimpleAccordion';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { data } from './data';


export default class Collapsible extends Component {
  state = {
    active: 0,
  }


  actionOne = () => {
    Alert.alert(
      '',
      'Button One Clicked',
      [
        { text: 'OK', onPress: () => console.log('object') },
      ],
      { cancelable: false },
    );
  }
  actionTwo = () => {
    Alert.alert(
      '',
      'Button Two Clicked',
      [
        { text: 'OK', onPress: () => console.log('object') },
      ],
      { cancelable: false },
    );
  }

  activate = (index) => {
    if (index === this.state.active) {
      this.setState({ active: -1 })
    } else {
      this.setState({ active: index })
    }
  }

  render() {
    const { active, } = this.state
    const dataArray = this.props.data || data
    return (
      <View style={styles.container}>
        {dataArray.map((data, index) => {
          return (
            <SimpleAccordion
              key={index}
              active={index === active}
              // activate={() => this.setState({ active: index })}
              activate={() => this.activate(index)}
              footer={data.footer}
              actionOne={this.actionOne}
              actionTwo={this.actionTwo}
              title={data.title}
              btnOneText={data.btnOneText}
              btnTwoText={data.btnTwoText}
              content={data.content}
            />
          )
        })}


      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
})
