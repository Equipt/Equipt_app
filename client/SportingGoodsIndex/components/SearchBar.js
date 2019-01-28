import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paginate from 'react-js-pagination';
import Geosuggest from 'react-geosuggest';

export default class SearchBar extends Component {

  static propTypes = {
    fetchSportingGoods: PropTypes.func.isRequired
  }

  static DEFAULT_GEO_DISTANCE = 5000

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      page: 0,
      location: null,
      distance: this.DEFAULT_GEO_DISTANCE
    }
  }

  onChange(key) {
    const { fetchSportingGoods } = this.props;
    this.state[key] = this.refs[key].value;
    this.setState(this.state);
    fetchSportingGoods(this.state);
  }

  clearKeyword() {
    const { fetchSportingGoods } = this.props;
    this.state.keyword = '';
    this.setState(this.state);
    fetchSportingGoods(this.state);
  }

  setPage(page) {
    const { fetchSportingGoods } = this.props;
    // NOTE: must start at 0
    this.state.page = page - 1;
    this.setState(this.state);
    fetchSportingGoods(this.state);
  }

  searchByLocation(suggestion) {
    const { fetchSportingGoods } = this.props;
    if (suggestion) {
      this.state.location = suggestion.location;
    } else {
      this.state.location = {}
    }
    this.setState(this.state);
    fetchSportingGoods(this.state);
  }

  changeGeoDistance() {
    const { fetchSportingGoods } = this.props;
    const { distanceSelect } = this.refs;
    this.state.distance = distanceSelect.value;
    this.setState(this.state);
    fetchSportingGoods(this.state);
  }

  clearGeoSearch() {
    const { fetchSportingGoods } = this.props;
    this._geoSearch.clear();
    this.state.location = null;
    this.state.distance = this.DEFAULT_GEO_DISTANCE;
    this.setState(this.state);
    fetchSportingGoods(this.state);
  }

  clear() {
    const { fetchSportingGoods } = this.props;
    this.setState({
      keyword: ''
    });
    fetchSportingGoods(this.state);
  }

  render() {

    const { totalResults = 0, totalPerPage = 0  } = this.props;
    const { page } = this.state;

    return (
      <div className="search-bar row">

        <div className="col-md-3 search-field">
          <input  className="form-control"
                  placeholder="Search By Keyword"
                  ref="keyword"
                  value={ this.state.keyword }
                  onChange={ this.onChange.bind(this, "keyword") }/>
          {
            this.state.keyword ?
            <i className="fa fa-times close pull-right"
               aria-hidden="true"
               onClick={ this.clearKeyword.bind(this) }
            ></i> :
            null
          }
        </div>

        <div className="col-md-3 search-field">
          <Geosuggest ref={el => this._geoSearch = el}
                      inputClassName="form-control"
                      suggestsHiddenClassName="hide"
                      onSuggestSelect={ this.searchByLocation.bind(this) }
          />
          {
            this.state.location ?
            <i  className="fa fa-times close pull-right"
                aria-hidden="true"
                onClick={ this.clearGeoSearch.bind(this) }
            ></i> :
            null
          }
        </div>

        <div className="col-xs-4 distance-field form-inline">
          <label className="col-xs-5 within">Within</label>
          <select className="form-control col-xs-6"
            ref="distanceSelect"
            onChange={ this.changeGeoDistance.bind(this) }
            disabled={ !this.state.location }
            value={ this.state.distance }>
            <option value={ 50000 }>50km</option>
            <option value={ 20000 }>20km</option>
            <option value={ 10000 }>10km</option>
            <option value={ 5000 }>5km</option>
          </select>
        </div>

        <div className="pull-right results">
        {
          totalResults > 20 ?
          <Paginate activePage={ page + 1 }
          itemsCountPerPage={ totalPerPage }
          totalItemsCount={ totalResults }
          onChange={ this.setPage.bind(this) }/>
          : null
        }

        {
          totalResults > 20 ?
          <span className="pages pull-right">{ totalPerPage * page } out of { totalResults }</span> :
          <span className="pages pull-right">{ totalResults } Results</span>
        }
        </div>

        <style jsx>{`
          .search-bar {
            margin: 0 15px 20px;
            z-index: 1;
            .search-field:first-child {
              padding-left: 0;
            }
            .search-field {
              i {
                position: absolute;
                right: 23px;
                top: 9px;
              }
            }
          }
          .distance-field {
            width: 150px;
          }
          .pages {
            text-align: right;
            line-height: 2.5;
          }
          .within {
            width: 50px;
            text-align: right;
            margin-top: 7px;
          }
          .distance-field select {
            width: 65px;
          }
          .search-field {
            @media(max-width: 991px) {
              padding: 0;
            }
          }
        `}</style>

        <style jsx global>{`
          .pagination {
            margin: 0 10px 0 0;
          }
          .geosuggest {
            position: relative;
            .geosuggest__suggests-wrapper {
              ul:not(.hide) {
                position: absolute;
                top: 12px;
                z-index: 1;
                background: #fff;
                border: solid 1px #CCC;
                li {
                  padding-left: 5px;
                }
              }
            }
          }
        `}</style>

        <div className="clearfix"></div>

      </div>
      )
  }

}
