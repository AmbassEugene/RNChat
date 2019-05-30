import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera';
import LeftNav from '../../components/ChatUI/ChatNavBar/LeftNav';
import RightNav from '../../components/ChatUI/ChatNavBar/RightNav';

export default class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user', {})
    return {
      title: user.name,
      headerLeft: <LeftNav back navigation={navigation} />,
      // headerRight: <RightNav />
    }
  }

  takePicture = async function () {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      this.props.navigation.state.params.callBack(data.uri, 'camera')
      this.props.navigation.goBack()
    }
  };
  render() {

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            // console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <View style={styles.innerView} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    // paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  innerView: {
    borderColor: "#000",
    borderWidth: 0.5,
    padding: 20,
    borderRadius: 20
  }
});
