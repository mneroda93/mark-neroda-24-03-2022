const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case "addFavorite":
      return [...state, action.payload];
    case "removeFavorite":
      return state.filter((cityObj) => cityObj.key !== action.payload);
    default:
      return state;
  }
}

export default favoritesReducer;
