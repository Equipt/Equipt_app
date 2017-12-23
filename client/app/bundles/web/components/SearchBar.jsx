import React from 'react';
import PropTypes from 'prop-types';
import Paginate from 'react-js-pagination';

export class SearchBar extends React.Component {

  static propTypes = {
    search: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      page: 1
    }
  }

  onChange(key) {
    const { search } = this.props;
    this.state[key] = this.refs[key].value;
    this.setState(this.state);
    search(this.state);
  }

  setPage(page) {
    const { search } = this.props;
    this.state.page = page;
    this.setState(this.state);
    search(this.state);
  }

  clear() {

    this.setState({
      keyword: ''
    });

    this.props.search(this.state);
  }

  render() {


    const { search, totalResults = 0, totalPages = 0, totalPerPage = 0  } = this.props;
    const { page } = this.state;

    return (
      <div className="col-xs-12 search-bar">

        <div className="row">

          <div className="col-sm-12 col-md-3 search-field">
            <input  className="form-control"
                    placeholder="Search By Keyword"
                    ref="keyword"
                    value={ this.state.keyword }
                    onChange={ this.onChange.bind(this, "keyword") }/>
          </div>

          <div className="col-xs-3 pull-right">
          {
            totalResults > 20 ?
            <Paginate activePage={ page }
            itemsCountPerPage={ totalPerPage }
            totalItemsCount={ totalResults }
            onChange={ this.setPage.bind(this) }/>
            : null
          }

          {
            totalResults > 20 ?
            <span>{ totalPerPage * page } out of { totalResults }</span> :
            <span>{ totalResults } Results</span>
          }
          </div>


        </div>

      </div>
    )
  }
}
