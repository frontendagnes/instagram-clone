export const initialState = {
    user: null,
  };
  //Selector sum of the prices in the like
  export const getLikeTotal = (likes) =>
    likes?.reduce((sum, item) => item.data.like + sum, 0);
  
  export const actionTypes = {
    SET_USER: "SET_USER",
    DELETE_USER: "DELETE_USER",
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.SET_USER:
        return {
          ...state,
          user: action.user,
        };
      case actionTypes.DELETE_USER:
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  