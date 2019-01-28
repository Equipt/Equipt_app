import React, { Component } from 'react';

export default class Flyout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: props.defaultTab
    }
    this.change = this.change.bind(this);
  }

  change(name) {
    this.setState({
      currentTab: name
    })
  }

  getLiClassName(childName) {
    const { currentTab } = this.state;
    return `list-item col-xs-2 col-md-12 ${ currentTab === childName ? 'active' : '' }`;
  }

  render() {
    const { children } = this.props;

    return (
      <div className="flyout-container container">
        <div className="row">
          <ul className="col-xs-12 col-md-2 list-items">
          {
            React.Children.map(children, child => {
              const { name } = child.props;
              return (
                  <li onClick={ () => this.change(name) } className={ this.getLiClassName(name) }>
                  { name }
                </li>
              );
            })
          }
          </ul>
          <div className="col-xs-12 col-md-10">
          {
            React.Children.map(children, child => {
              const { currentTab } = this.state;
              const { name } = child.props;
              if (currentTab === name) return child;
            })
          }
          </div>
        </div>
        <style jsx>{`
          .list-item {
            cursor: pointer;
            padding: 5px 0;
          }
          .list-item.active {
            color: #D65A3F;
          }
        `}</style>
      </div>
    )
  }

}
