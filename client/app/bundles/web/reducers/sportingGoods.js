import types from 'actions/types';

const sportingGoods = (state = [], action) => {
	switch (action.type) {
        case types.SET_SPORTING_GOODS:
            return action.payload;
        default: 
            return state;
	}
}

export default sportingGoods;