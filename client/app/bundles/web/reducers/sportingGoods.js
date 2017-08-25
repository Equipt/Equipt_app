import types from 'actions/types';

const sportingGoods = (state = [], action) => {
	switch (action.type) {
        case types.SET_SPORTING_GOODS:
            return action.payload;
				break;
				case types.DETACH_SPORTING_GOOD:
					debugger;
				break;
        default:
            return state;
	}
}

export default sportingGoods;
