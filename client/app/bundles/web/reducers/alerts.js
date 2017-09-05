import types from 'actions/types';

const alerts = (state = {}, action) => {
    switch (action.type) {
        case types.ERROR_ALERT:
            return action.payload;
        case types.SUCCESS_ALERT:
            return action.payload;
        case types.INFO_ALERT:
        	return action.payload;
        case types.CLEAR_ALERTS:
            return action.payload;
        default:
            return state;
    }
};

export default alerts;
