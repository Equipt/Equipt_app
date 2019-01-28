import types from './types';

export const openModal = Component => {
    return {
      type: types.OPEN_MODAL,
      payload: {
        isOpen: true,
        content: Component
      }
    }
}

export const closeModal = () => {
  return {
    type: types.CLOSE_MODAL,
    payload: {
      isOpen: false,
      content: null
    }
  }
}
