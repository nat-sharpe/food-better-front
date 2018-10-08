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
    },
    maxCalories: {
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

// const ConnectFilterScreen = connect(state => ({
//   AddToMenus: state.reservations
// }));

// export default ConnectFilterScreen(FilterScreen);

let ConnectedFilterScreen = connect(state => ({ state }))(FilterScreen)

export default ConnectedFilterScreen;
