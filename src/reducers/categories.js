const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_CATEGORIES":
      return [...action.payload];
    default:
      return state;
  }
};

export default categoriesReducer;
