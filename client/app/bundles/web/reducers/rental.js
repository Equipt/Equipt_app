import types from 'actions/types';

const rental = (state = {}, action) => {
    switch (action.type) {
        case types.SET_RENTAL:
        	return action.payload;
        default:
            return state;
    }
}

export default rental;
