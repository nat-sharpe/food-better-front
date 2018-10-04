import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

import Component2 from './screens/Component2';

export default class foodbetter extends Component{
  render(){
    return(
      <View>
        <Text>Hi </Text>
        <Component2 />
      </View>
    )
  }
}

AppRegistry.registerComponent('Food Better', () => foodbetter);