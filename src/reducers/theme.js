const themeReducer = (
  state = {
    color: "black",
    background: "white",
  },
  action
) => {
  switch (action.type) {
    case "SWITCH_THEME":
      return { ...action.payload };
    default:
      return state;
  }
};

export default themeReducer;
