const jokeReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_JOKE":
      return { ...action.payload };
    default:
      return state;
  }
};

export default jokeReducer;
