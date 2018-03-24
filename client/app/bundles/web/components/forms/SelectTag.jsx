import React from 'react';
import PropTypes from 'prop-types';

const SelectTag = props => {
  const { options, ...otherProps } = props;

  return (<select { ...otherProps }>
    { Object.keys(options).map(key => <option key={ key } value={ key }>{ options[key] }</option>) }
  </select>);
};

SelectTag.propTypes ={
  options: PropTypes.object.isRequired
}

export default SelectTag;
