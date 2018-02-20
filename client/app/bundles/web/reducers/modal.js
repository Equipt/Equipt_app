import types from 'actions/types';

const modal = (state = {}, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
    	return action.payload;
    case types.CLOSE_MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default modal;
