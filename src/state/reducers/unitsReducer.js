const unitsReducer = (state = true, action) => {
  switch (action.type) {
    case "celsius":
      return !state;
    default:
      return state;
  }
}

export default unitsReducer;
