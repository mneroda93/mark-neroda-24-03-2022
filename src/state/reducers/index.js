import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import unitsReducer from "./unitsReducer";
import favoritesReducer from "./favoritesReducer";
import cityCodeReducer from "./cityCodeReducer";
import suggestionsReducer from "./suggestionsReducer";

const reducers = combineReducers({
  theme: themeReducer,
  units: unitsReducer,
  favorites: favoritesReducer,
  AIO: cityCodeReducer,
  suggestions: suggestionsReducer,
});

export default reducers;
