import types from 'actions/types';

const rental = (state = false, action) => {
    switch (action.type) {
        case types.SELECTED_RENTAL:
        	return action.payload;
        case types.SET_RENTAL:
          return action.payload;
        case types.AGREED_TO_RENTAL_TERMS:
          return Object.assign({}, state, {
            agreedToTerms: action.payload
          })
        break;
        case types.CLEAR_RENTAL:
          return action.payload;
        break;
        default:
            return state;
    }
};

export default rental;
