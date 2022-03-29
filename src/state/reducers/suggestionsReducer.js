const suggestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SUGGESTIONS":
      return action.payload;
    default:
      return [];
  }
}

export default suggestionsReducer;
