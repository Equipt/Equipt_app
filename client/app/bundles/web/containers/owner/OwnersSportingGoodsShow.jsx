import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sportingGoodActions from 'actions/sportingGood';

import OwnersSportingGoodUsage from 'components/OwnersSportingGoodUsage';

class OwnersSportingGoodsShow extends React.Component {

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    })
  };

  componentWillMount() {

    const { actions }  = this.props;
    const { pathname } = this.context.router.route.location;

    actions.fetchSportingGood(pathname);

  }

  render() {
    return (
      <OwnersSportingGoodUsage { ...this.props }/>
    )
  }

}

function mapStateToProps(state, ownProps) {
	return {
		sportingGood: state.sportingGood,
		loader: state.loader
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(sportingGoodActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(OwnersSportingGoodsShow);
