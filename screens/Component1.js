import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class component1 extends Component{
  constructor(){
    super();
    this.state = {
      name: 'Nat',
      showName: false
    }
  }
  render(){
    let name = this.state.showName ? this.state.name : 'No name';
    return(
      <View>
        <Text>{this.props.message}</Text>
        <Text>{name}</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('Food Better', () => component1);