import types from 'actions/types';

const sportingGoods = (state = [], action) => {
	switch (action.type) {
    case types.SET_SPORTING_GOODS:	
			return Object.assign({}, state, {
				results: action.payload.sporting_goods,
				total: action.payload.total
			})
			break;
		case types.DETACH_SPORTING_GOOD:
			return state.filter(sportingGood => action.payload != sportingGood.slug);
			break;
    default:
    	return state;
	}
}

export default sportingGoods;
