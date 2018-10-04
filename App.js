import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

import Component1 from './screens/Component1';

export default class foodbetter extends Component{
  render(){
    return(
      <View>
        <Text>Hi </Text>
        <Component1 message={"The days have gone down in the West"}/>
      </View>
    )
  }
}

AppRegistry.registerComponent('Food Better', () => foodbetter);