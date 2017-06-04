import React from 'react'

import CardsRenderer from './CardsRenderer.jsx'
import NotFound from '../../shared/NotFound.jsx'


function ButtonFilter(props) {
    return (
        <button className="dropdown-item" type="button" onClick={props.filter}>
            {props.filterName}
        </button>
    )
}


export default class CardsContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            blogContentType: null, // 'articles' or 'news'
            isOrderAsc: false,
            isPageNotFound: false,
        }
        this.setFilters = this.setFilters.bind(this)
    }

    setFilters(type, isAsc) {
        this.setState({
            blogContentType: type,
            isOrderAsc: isAsc,
        })
    }

    componentDidMount() {
        if ((this.props.match.params.type === 'articles') ||
            (this.props.match.params.type === 'news')
        ) {
            this.setFilters(this.props.match.params.type, false)
        } else {
            this.setState({isPageNotFound: true})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.type !== 'articles' &&
                nextProps.match.params.type !== 'news') {
            this.setState({isPageNotFound: true})
        } else if (this.props.match.params.type !== nextProps.match.params.type) {
            this.setFilters(nextProps.match.params.type, false)
        }
    }

    render() {
        if (this.state.isPageNotFound) return <NotFound />
        else if (this.state.blogContentType === null) return null
        else {
            return (
                <div>
                    <div
                        className="row justify-content-between"
                        id="blog__buttons__filter-list"
                    >
                        <h3>{'All ' + this.state.blogContentType}</h3>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Sort by
                            </button>
                            <div className="dropdown-menu"
                                aria-labelledby="filters"
                            >
                                <ButtonFilter
                                    filterName='Latest'
                                    filter={() => this.setFilters(
                                        this.state.blogContentType,
                                        false
                                    )}
                                />
                                <ButtonFilter
                                    filterName='Oldest'
                                    filter={() => this.setFilters(
                                        this.state.blogContentType,
                                        true
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <CardsRenderer filters={this.state} />
                </div>
            )
        }
    }
}
