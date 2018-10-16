import React from 'react';
import { View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import t from 'tcomb-form-native';
import { connect } from "react-redux";


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
      label: 'Max. carbs per serving',
    },
    maxCalories: {
      label: 'Max. calories per serving',
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
  i18n: {
    optional: '',
    required: ''
  }
};

class FilterScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          maxCalories: 0,
          maxCarbs: 0,
          organic: false,
          vegan: false,
          glutenFree: false
      };
    }

  handleSubmit = () => {
    const value = this._form.getValue();
    this.props.dispatch({
      type: 'CHANGE_SETTINGS',
      settings: value
    });
  }
  
  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Form onChange={this.handleSubmit}
            ref={component => this._form = component}
            type={Settings} 
            options={options}
          />
        </View>
      </DismissKeyboard>
    );
  }
}

export default connect()(FilterScreen)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff'
  },
});