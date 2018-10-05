
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableOpacity,
  Linking,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

// <View style={styles.container}>
//  <TouchableHighlight
//  style={[styles.button, styles[this.state.status[camera]]]}
//  key={camera}
//  onPress={() => this._requestCameraPermission(camera)}
//  >
//  <View>
//  <Text style={styles.subtext}>{this.state.status[camera]}</Text>
//  </View>
//  </TouchableHighlight>
// </View>
// _requestCameraPermission = (permission) => {
//     Permissions.request(permission).then(response => {
//       this.setState({ cameraPermission: response })
//     })
// }

// _requestPermission = permission => {
//   var options
//   if (permission == 'location') {
//         options = this.state.isAlways ? 'always' : 'whenInUse'
//   }
//   Permissions.request(permission, options)
//         .then(res => { this.setState({ status: { ...this.state.status, [permission]: res },
//           })
//           if (res != 'authorized') {
//             var buttons = [{ text: 'Cancel', style: 'cancel' }]
//             if (this.state.canOpenSettings)
//               buttons.push({
//   text: 'Open Settings', 
//   onPress: this._openSettings,
//               })
//   Alert.alert( 'Whoops!','There was a problem getting your permission. Please enable it from settings.',buttons,)
//           }
//         })
//         .catch(e => console.warn(e))
//     }

//     'use strict';


export default class ScanScreen extends Component {
  onSuccess(e) {
    Linking.openURL(e.data).catch(err => console.error('An error occured', err));
  }

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: QRCodeScanner,
          title: 'Scan Code',
          passProps: {
            onRead: this.onSuccess.bind(this),
            topContent: (
              <Text style={styles.centerText}>
                Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
              </Text>
            ),
            bottomContent: (
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            ),
          },
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

AppRegistry.registerComponent('Component4', () => Component4);