import types from 'actions/types';
 
const errors = (state = {}, action) => {
    switch (action.type) {
        case types.RESET_ERRORS: 
        	return action.payload;
        default: 
            return state;
    }
};

export default errors;