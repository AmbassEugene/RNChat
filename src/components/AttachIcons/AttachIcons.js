import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import AppStyles from '../../config/styles';

const AttachIcons = ({ name, iconName, callBack }) => {
  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={callBack} style={styles.avatarView}>
        <FontAwesomeIcon
          size={24}
          color={AppStyles.colors.inactiveGreyColor}
          name={iconName}
        />
        <Text style={styles.avatarText}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginBottom: 3,
    marginTop: 3,
    padding: 10,
    width: '30%'
  },
  avatarView: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 0.5,
    elevation: 1,
  },
  avatarText: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 7,
  },
})


export default AttachIcons
