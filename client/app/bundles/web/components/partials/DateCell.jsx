import React, { Component } from 'react';

const DateCell = ({
  range,
  value,
  children
}) => {

  const now = new Date();
  now.setHours(0,0,0,0);

  const getClassNames = () => {
    let classArr = []
    value <= now ? classArr.push("date-in-past") : classArr.push("date-cell");
    value.getDay() === 6 && classArr.push("saturday");
    return classArr.join(" ");
  }

  return (
    <div className={ getClassNames() }>
      { children }
    </div>
  )

}

export default DateCell;
