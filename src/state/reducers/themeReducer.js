const themeReducer = (state = false, action) => {
  switch (action.type) {
    case "dark":
      return !state;
    default:
      return state;
  }
}

export default themeReducer;
