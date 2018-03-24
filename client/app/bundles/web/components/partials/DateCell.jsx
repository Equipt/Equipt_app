import React, { Component } from 'react';

export class DateCell extends Component {

  constructor(props) {
    super(props);

    this.now = new Date();
    this.now.setHours(0,0,0,0);

    this.getClassNames = this.getClassNames.bind(this);

  }

  getClassNames() {

    const { value } = this.props;

    let classArr = [];

    value <= this.now ? classArr.push("date-in-past") : classArr.push("date-cell rbc-day-bg")
    value.getDay() === 6 && classArr.push("saturday");
    return classArr.join(" ");

  }

  render() {

    const { children } = this.props;

    return (
      <div className={ this.getClassNames() }>
      { children }
      </div>
    )

  }

}
