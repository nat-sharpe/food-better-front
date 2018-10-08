import React from 'react';
import { View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import t from 'tcomb-form-native'; 

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Form = t.form.Form;

const Settings = t.struct({
  maxCarbs: t.maybe(t.Number),
  maxCalories: t.maybe(t.Number),
  organic: t.Boolean,
  vegan: t.Boolean,
  glutenFree: t.Boolean
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'black',
      fontSize: 16,
      marginBottom: 7,
      fontWeight: '500'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    maxCarbs: {
      error: 'Without an email address how are you going to reset your password when you forget it?'
    },
    maxCalories: {
      error: 'Choose something you use on a dozen other sites or something you won\'t remember'
    },
    organic: {
      label: 'Organic',
    },
    vegan: {
      label: 'Vegan',
    },
    glutenFree: {
      label: 'Gluten-free',
    },
  },
  stylesheet: formStyles,
};

export default class FilterScreen extends React.Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  }
  
  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Form 
            ref={component => this._form = component}
            type={Settings} 
            options={options}
          />
          <Button
            title="Save"
            onPress={this.handleSubmit}
          />
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

