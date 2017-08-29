import React from 'react';
import PropTypes from 'prop-types';

export class SearchBar extends React.Component {

    static propTypes = {
        search: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange(key) {
        this.setState({
            [key]: this.refs[key].value
        });
    }

    clear() {

        this.setState({
            keyword: ''
        });

        this.props.search(null);
    }

    render() {

        const { search } = this.props;

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

                    <div className="col-xs-2 col-md-1 search-field pull-right">
                        <button className="btn btn-success btn-info" onClick={ this.clear.bind(this) }>
                            <i className="fa fa-times" aria-hidden="true"></i>
                            Clear
                        </button>
                    </div>

                </div>

            </div>
        )
    }
}
