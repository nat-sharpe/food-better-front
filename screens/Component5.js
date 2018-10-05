import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      item1: {id: '9', message: 'Scan'},
      item2: {id: '4', message: 'Scan'},
      item3: {id: '7', message: 'Scan'},
    }
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    );
  };

  render() {
    return (
      <View>
        <Text style={styles.myText}>Food Better</Text>
        <View style={styles.scanner}>
          {this.state.hasCameraPermission === null ?
            <Text>Requesting for camera permission</Text> :
            this.state.hasCameraPermission === false ?
              <Text>Camera permission is not granted</Text> :
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={styles.scanner}
              />
          }
        </View>
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.v1} 
            onPress={() => this.pressHandler('item1')}
            >
            <View>
              <Text>
                {this.state.item1.message}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.v1} 
            onPress={() => this.pressHandler('item2')}
            >
            <View>
              <Text>
                {this.state.item2.message}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.v1} 
            onPress={() => this.pressHandler('item3')}
            >
            <View>
              <Text>
                {this.state.item3.message}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  scanner: {
    height: 200, 
    width: 300
  },
  myText: {
    color: 'white',
    backgroundColor: 'blue'
  },
  container: {
    flexDirection: 'row',
    height: 100
  },
  v1: {
    flex: 1,
    backgroundColor: '#777777',
    padding: 10,
    margin: 3,
    marginTop: 6
  }
});