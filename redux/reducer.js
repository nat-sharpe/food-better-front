const reducer = (oldState, action) => {
  if (action.type === 'CHANGE_SETTINGS') {
    //   console.log('Poo')
    //   console.log(action)
    //   console.log(oldState)
    //   console.log(oldState.settings)
    //   console.log(action.settings.vegan)
      return {
          ...oldState,
          settings: action.settings
      } 
  } else if (action.type === 'UPDATE_ITEMS') {
      let newItem = {
        id: action.id,
        allowed: action.allowed,
        name: action.name,
        brand: action.brand,
        imageURL: action.imageURL,
        carbs: action.carbs,
        calories: action.calories,
        organic: action.organic,
        vegan: naction.vegan,
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