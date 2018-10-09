import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { BarCodeScanner, Permissions } from 'expo';

class ScannerScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      // currentScans: [
      //   {id: '0', message: '1'},
      //   {id: '0', message: '2'},
      //   {id: '0', message: '3'},
      // ],
    }
  }

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  fetchItemData = code => {
    const URL = 'http://foodbetter.fun:3000/scan';
    console.log(JSON.stringify({
      id: code.data,
      maxCarbs: this.props.settings.maxCarbs,
      maxCalories: this.props.settings.maxCalories,
      organic: this.props.settings.organic,
      vegan: this.props.settings.vegan,
      glutenFree: this.props.settings.glutenFree
    }))
    fetch(
      URL, 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: code.data,
          maxCarbs: this.props.settings.maxCarbs,
          maxCalories: this.props.settings.maxCalories,
          organic: this.props.settings.organic,
          vegan: this.props.settings.vegan,
          glutenFree: this.props.settings.glutenFree
        })
      }
    ) 
    .then(response => {
      response.json()
      .then(data => {
        this.props.dispatch({
          type: 'UPDATE_ITEM',
          id: data.id,
          allowed: data.allowed,
          name: data.name,
          brand: data.brand,
          imageURL: data.imageURL,
          carbs: data.carbs,
          calories: data.calories,
          organic: data.organic,
          vegan: data.vegan,
          glutenFree: data.glutenFree,
        });
      })
    })
    .catch(err => console.log(err));
  };

  handleBarCodeRead = code => {
    if (this.props.oldScans[2].id !== code.data) {
      this.fetchItemData(code)
    };
  }

  buildButtons = (item) => {
    let symbol = require('../assets/images/yes.png')
    return (
        <View>
          <Text style={styles.text1}>
            {`${item.brand} ${item.name}`}
          </Text>
        </View>
    )
  }

  render() {
    return (
      <View>
        {/* <Text style={styles.myText}>Food Better</Text> */}
        <View style={styles.scanner}>
          {this.state.hasCameraPermission === null ?
            <Text>Requesting for camera permission</Text> :
            this.state.hasCameraPermission === false ?
              <Text>Camera permission is not granted</Text> :
              <BarCodeScanner
                onBarCodeScanned={this.handleBarCodeRead}
                style={styles.preview}
              />
          }
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.v1}>
            {this.buildButtons(this.props.oldScans[2])}
         </TouchableOpacity>
          <TouchableOpacity style={styles.v1}>
            {this.buildButtons(this.props.oldScans[1])}
          </TouchableOpacity>
          <TouchableOpacity style={styles.v1}>
            {this.buildButtons(this.props.oldScans[0])}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => { 
  return {
    settings: state.settings,
    oldScans: state.oldScans  
  } 
};

export default connect(mapStateToProps)(ScannerScreen)


const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  scanner: {
    height: 200, 
    width: Dimensions.get('window').width
  },
  myText: {
    color: 'white',
    backgroundColor: 'green',
    fontSize: 30,
    textAlign: 'center'
  },
  container: {
    flexDirection: 'column',
    height: 250
  },
  v1: {
    flex: 1,
    backgroundColor: '#222222',
    padding: 10,
    margin: 3,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text1: {
    fontSize: 15,
    color: 'white'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
});