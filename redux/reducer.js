const reducer = (oldState, action) => {
  if (action.type === 'CHANGE_SETTINGS') {
      return {
          ...oldState,
          settings: action.settings,
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
          ]
      } 
  } else if (action.type === 'UPDATE_ITEM') {
      let newItem = {
        id: action.id,
        allowed: action.allowed,
        name: action.name,
        brand: action.brand,
        imageURL: action.imageURL,
        carbs: action.carbs,
        calories: action.calories,
        organic: action.organic,
        vegan: action.vegan,
        glutenFree: action.glutenFree,
      };
      let newScans = [...oldState.oldScans];
      newScans.splice(0, 1);
      newScans.push(newItem);
      return {
          ...oldState,
          oldScans: newScans
      }
  }
  return oldState;
}

export default reducer;