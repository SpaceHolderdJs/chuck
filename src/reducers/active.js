const activeReducer = (state = "random", action) => {
  switch (action.type) {
    case "SWITCH_ACTIVE":
      return action.payload;
    default:
      return state;
  }
};

export default activeReducer;
