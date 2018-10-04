import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableHighlight} from 'react-native';

export default class Component2 extends Component{

  constructor(props){
    super(props);
    this.state = {
      item1: 'Scan',
      item2: 'Scan',
      item3: 'Scan',
    }
  }

  pressHandler = () => {
    const URL = 'http://foodbetter.fun:3000/scan';
    
    fetch(
      URL, 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: 6
        })
      }
    ) 
    .then(response => {
      response.json()
      .then(data => {
        console.log(data.status)
        let status = data.status ? 'Good to Eat' : 'Poison';
        console.log(status)
        this.setState({item1: status});
      })
    })
    .catch(err => console.log(err));
  }

  render(){
    return(
      <View>
        <Text style={styles.myText}>Food Better</Text>
        <View style={styles.container}>
          <TouchableHighlight onPress={this.pressHandler}>
            <View style={styles.v1}>
              <Text>{this.state.item1}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.v2}>
            <Text style={styles.vText}>{this.state.item2}</Text>
          </View>
          <View style={styles.v3}>
            <Text style={styles.vText}>{this.state.item3}</Text>
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
    backgroundColor: '#009900',
    padding: 10
  },
  v2: {
    flex: 1,
    backgroundColor: 'black',
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