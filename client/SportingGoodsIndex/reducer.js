import types from 'actions/types';

const defaultState = {
  results: [],
  owned: false
}

const sportingGoods = (state = defaultState, action) => {
	switch (action.type) {
    case types.SET_SPORTING_GOODS:
			return Object.assign({}, state, action.payload);
		break;
    default:
    	return state;
	}
}

export default sportingGoods;
