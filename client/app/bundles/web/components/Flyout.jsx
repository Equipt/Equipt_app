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

  render() {
    const { children } = this.props;

    return (
      <div className="flyout-container container">
        <div className="row">
          <ul className="col-xs-2">
          {
            React.Children.map(children, child => {
              const { name } = child.props;
              const { currentTab } = this.state;
              return (
                  <li onClick={ () => this.change(name) } className={ `list-item ${ currentTab === name ? 'active' : '' }` }>
                  { name }
                </li>
              );
            })
          }
          </ul>
          <div className="col-xs-10">
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
