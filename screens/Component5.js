import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      currentScans: [
        {id: '0', message: '1'},
        {id: '0', message: '2'},
        {id: '0', message: '3'},
      ]
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

  _fetchItemData = code => {
    const URL = 'http://foodbetter.fun:3000/scan';
    fetch(
      URL, 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: code.data
        })
      }
    ) 
    .then(response => {
      response.json()
      .then(data => {
        console.log(data.status)
        let status = data.status ? 'YES' : 'NO';
        console.log(status)
        let newScans = [...this.state.currentScans];
        newScans.splice(0, 1);
        newScans.push({id: code.data, message: status});
        this.setState({currentScans: newScans})
        console.log(this.state.currentScans)
      })
    })
    .catch(err => console.log(err));
  };

  _handleBarCodeRead = code => {
    let newItem = true;
    this.state.currentScans.forEach(item => {
      if (code.data === item.id) {
        newItem = false
      }
    })
    if (newItem) {this._fetchItemData(code)};
  }

  buildButtons = (item) => {
    console.log('yep');
    let color = 'v1';
    (item.message === 'YES') ? color = 'v2' : 'v3';
    return (
      <TouchableOpacity 
        style={styles.color} 
        // onPress={() => this.pressHandler('item1')}
        >
        <View>
          <Text>
            {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

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
          <View>{this.buildButtons(this.state.currentScans[0])}</View>
          <View>{this.buildButtons(this.state.currentScans[1])}</View>
          <View>{this.buildButtons(this.state.currentScans[2])}</View>
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
  },
  v2: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10,
    margin: 3,
    marginTop: 6
  },
  v3: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    margin: 3,
    marginTop: 6
  }
});