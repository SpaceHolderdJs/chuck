const likeListReducer = (
  state = localStorage.getItem("likeList")
    ? JSON.parse(localStorage.getItem("likeList"))
    : [],
  action
) => {
  switch (action.type) {
    case "INIT_LIKELIST":
      return [...action.payload];
    case "ADD_TO_LIKELIST":
      return [...state, action.payload];
    case "REMOVE_FROM_LIKELIST":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

export default likeListReducer;
