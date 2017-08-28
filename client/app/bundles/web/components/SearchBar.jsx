import React from 'react';
import PropTypes from 'prop-types';

export class SearchBar extends React.Component {

    static propTypes = {
        search: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            keyword: null
        }
    }

    onChange(key) {
        this.setState({
            [key]: this.refs[key].value
        });
    }

    render() {

        const { search } = this.props;

        return (
            <div className="col-xs-12 search-bar">

                <div className="row">

                    <div className="col-xs-3 search-field">
                        <input  className="form-control"
                                placeholder="Search By Keyword"
                                ref="keyword"
                                onChange={ this.onChange.bind(this, "keyword") }/>
                    </div>

                    <div className="col-xs-3 search-field">
                        <input  className="btn btn-success"
                                type="submit"
                                value="Search"
                                onClick={ search.bind(this, this.state) }/>
                    </div>

                </div>

            </div>
        )
    }
}
