import types from 'actions/types';

import { showSuccessAlert, showErrorAlert } from './alerts';

// Fetch current user
export const reportBug = data => {
  return function(dispatch, getState, { api }) {
    api.post('/report_a_bug', data)
    .then(data => dispatch(showSuccessAlert(data.info)))
  }
}
