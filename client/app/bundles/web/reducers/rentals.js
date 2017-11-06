import types from 'actions/types';

const rentals = (state = [], action) => {
  switch (action.type) {
    case types.SET_RENTALS:
      return action.payload;
    case types.DETACH_RENTAL:
      return state.filter(rental => rental.hashId != action.payload.hashId);
    break;
    default:
      return state;
  }
};

export default rentals;
