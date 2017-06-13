import types from 'actions/types';
 
const currentUser = (state = null, action) => {
    switch (action.type) {
        case types.FETCH_CURRENT_USER:
           return action.payload;
        case types.SET_CURRENT_USER:
        	return action.payload;
        case types.FETCHING_CURRENT_USER: 
        	return action.payload;
        default:
            return state;
    }
};

export default currentUser;