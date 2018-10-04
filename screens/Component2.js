import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';

export default class Component2 extends Component{
  render(){
    return(
      <View>
        <Text style={styles.myText}>I Live Again</Text>
        <View style={styles.container}>
          <View style={styles.v1}>
            <Text>Yay</Text>
          </View>
          <View style={styles.v2}>
            <Text>Yay</Text>
          </View>
          <View style={styles.v3}>
            <Text style={styles.vText}>Yay</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: 'red',
    padding: 10
  },
  v2: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10
  },
  v3: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  vText: {
    color: 'white'
  }
})
AppRegistry.registerComponent('Component2', () => Component2);