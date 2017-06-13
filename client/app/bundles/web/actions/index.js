import types from './types';

// Change Sporting Goods
export const addSportingGoods = (data) => ({
	type: types.CHANGE_SPORTING_GOODS,
	payload: data  
});