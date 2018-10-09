import { createStore } from 'redux';
import reducer from './reducer.js';

let initialState = {
  oldScans: [
    {
      id: null,
      allowed: null,
      name: null,
      brand: null,
      imageURL: null,
      carbs: null,
      calories: null,
      organic: null,
      vegan: null,
      glutenFree: null,
    },
    {
      id: null,
      allowed: null,
      name: null,
      brand: null,
      imageURL: null,
      carbs: null,
      calories: null,
      organic: null,
      vegan: null,
      glutenFree: null,
    },
    {
      id: null,
      allowed: null,
      name: null,
      brand: null,
      imageURL: null,
      carbs: null,
      calories: null,
      organic: null,
      vegan: null,
      glutenFree: null,
    },
  ],
  settings: {
    maxCalories: 0,
    maxCarbs: 0,
    organic: false,
    vegan: false,
    glutenFree: false,
  }
}

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;