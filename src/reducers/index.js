import { combineReducers } from "redux";

//reducers

import likeListReducer from "./likeList";
import themeReducer from "./theme";

import activeReducer from "./active";
import categoriesReducer from "./categories";
import searchValReducer from "./searchVal";
import categoryReducer from "./categoty";
import jokeReducer from "./joke";

const allReducers = combineReducers({
  likeList: likeListReducer,
  theme: themeReducer,
  active: activeReducer,
  categories: categoriesReducer,
  searchVal: searchValReducer,
  category: categoryReducer,
  joke: jokeReducer,
});

export default allReducers;
