import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'


const Gifs = ({ sendGif, imgSrc }) => {
  return (
    <TouchableOpacity onPress={() => sendGif(imgSrc, 'gifs')} style={styles.wrapper}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: imgSrc }}
      />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 5,
    width: '49%',
    height: 110
  },
  image: {
    width: '100%',
    height: 110,
    borderRadius: 5
  },
})

export default Gifs
