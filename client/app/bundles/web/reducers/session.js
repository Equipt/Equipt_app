import types from 'actions/types';

const session = (state = {}, action) => {
	switch (action.type) {
    case types.FETCH_CURRENT_USER:
        return action.payload;
    case types.SET_CURRENT_USER:
        return action.payload;
    case types.FETCHING_CURRENT_USER:
    	return action.payload;
    case types.CLEAR_SESSION:
    	return action.payload;
		case 'HYDRATE_STATE':
			return action.storedState.session;
    default:
      return state;
	}
}

export default session;
