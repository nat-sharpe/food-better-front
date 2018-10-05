import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';

export default class Component2 extends Component{

  constructor(props){
    super(props);
    this.state = {
      item1: {id: '9', message: 'Scan'},
      item2: {id: '4', message: 'Scan'},
      item3: {id: '7', message: 'Scan'},
    }
  }

  pressHandler = (item) => {
    const URL = 'http://foodbetter.fun:3000/scan';
    fetch(
      URL, 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.state[item].id
        })
      }
    ) 
    .then(response => {
      console.log(this.state[item])
      response.json()
      .then(data => {
        console.log(data.status)
        let status = data.status ? 'YES' : 'NO';
        console.log(status)
        this.setState({[item]: {id: this.state[item].id, message: status}});
        console.log(this.state[item])
      })
    })
    .catch(err => console.log(err));
  }

  render(){
    return(
      <View>
        <Text style={styles.myText}>Food Better</Text>
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
    backgroundColor: '#777777',
    padding: 10,
    margin: 3,
    marginTop: 6
  }
})

AppRegistry.registerComponent('Component2', () => Component2);