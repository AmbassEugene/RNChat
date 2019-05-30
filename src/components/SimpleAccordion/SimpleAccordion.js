
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Surface, Text } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles';

const SimpleAccordion = (props) => {
  const {
    active,
    footer,
    activate,
    actionOne,
    actionTwo,
    title,
    content,
    btnOneText,
    btnTwoText
  } = props

  return (
    <Surface style={styles.container}>
      <TouchableOpacity onPress={activate} style={styles.header}>
        <Text style={styles.title}>
          {title || 'Accordion Title'}
        </Text>

        <FontAwesomeIcon
          size={15}
          color={'#fff'}
          style={{ marginRight: 10, marginBottom: 8 }}
          name={active ? "chevron-up" : "chevron-down"}
        />
      </TouchableOpacity>

      {active ?
        <View>

          <View style={styles.bodyContainer}>
            <View style={styles.bodyContent}>
              <Text>
                {content !== '' ? content : 'This is simple accordion body'}
              </Text>
            </View>

          </View>

          {
            footer ?
              <View style={styles.footer}>
                <TouchableOpacity onPress={actionOne}>
                  <Text style={styles.btnCancel}>
                    {btnOneText || 'Cancel'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={actionTwo}>
                  <Text style={styles.btnOk}>
                    {btnTwoText || 'Okay'}
                  </Text>
                </TouchableOpacity>
              </View>
              : null
          }
        </View>
        : null
      }


    </Surface>
  )
}



export default SimpleAccordion
