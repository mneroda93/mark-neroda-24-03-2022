const cityCodeReducer = (state = {}, action) => {

  switch (action.type) {

    case "FORECASTS": {
      return action.payload
    }
    default:
      return state;
  }
}

export default cityCodeReducer;
