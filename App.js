import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';

import Component5 from './screens/Component5';

export default class foodbetter extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Component5 />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  }
});

AppRegistry.registerComponent('Food Better', () => foodbetter);