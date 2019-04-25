const userInfo = (state = { isSigned: false }, action) => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userInfo;
