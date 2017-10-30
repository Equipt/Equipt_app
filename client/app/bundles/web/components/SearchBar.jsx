import React from 'react';
import PropTypes from 'prop-types';
import Paginate from 'react-js-pagination';

export class SearchBar extends React.Component {

    static propTypes = {
        search: PropTypes.func.isRequired
    }

    static MAX_PAGES_SHOWN = 5

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            page: 1,
            per_page: 12
        }
    }

    onChange(key) {
        this.setState({
            [key]: this.refs[key].value
        });
    }

    setPage(page) {

      this.setState({
        page: page
      })

      this.props.search(this.state);
    }

    clear() {

        this.setState({
            keyword: ''
        });

        this.props.search(this.state);
    }

    render() {

        const { search } = this.props;

        const { page, per_page } = this.state;
        const { pagesTotal } = this.props;

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

                    <div className="col-xs-2 col-md-1 search-field">
                        <input  className="btn btn-success"
                                type="submit"
                                value="Search"
                                onClick={ search.bind(this, this.state) }/>
                    </div>

                    <div className="col-xs-2 col-md-1 search-field">
                        <button className="btn btn-success btn-info" onClick={ this.clear.bind(this) }>
                            <i className="fa fa-times" aria-hidden="true"></i>
                            Clear
                        </button>
                    </div>

                    <Paginate activePage={ page }
                              itemsCountPerPage={ per_page }
                              totalItemsCount={ pagesTotal }
                              pageRangeDisplayed={ this.MAX_PAGES_SHOWN }
                              onChange={ this.setPage.bind(this) }/>

                </div>

            </div>
        )
    }
}
