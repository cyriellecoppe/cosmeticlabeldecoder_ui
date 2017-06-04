import React from 'react'
import $ from 'jquery'

import DatabaseSorter from './DatabaseSorter.jsx'
import NotFound from '../../shared/NotFound.jsx'


function SortButton(props) {
    return (
        <button
            className="btn btn-secondary btn-sm database__button__filter"
            id={"database__button__filter--" + props.name}
            onClick={props.sort}
        >
            {props.name}
        </button>
    )
}


export default class DatabaseContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageSorter: null,
            isPageNotFound: false,
        }
        // 'ingredients' or 'products'
        this.databaseContentType = this.props.match.params.type
        // default sorter: index 0
        this.sorters = {
            ingredients: ['type', 'a-z'],
            products: ['category', 'brand', 'certification']
        }
        this.setSorter = this.setSorter.bind(this)
    }

    setSorter(sorter) {
        $('#database__button__filter--' + this.state.pageSorter)
            .removeClass('filter--is-focused')
        this.setState(
            {pageSorter: sorter},
            function () {
                $('#database__button__filter--' + this.state.pageSorter)
                    .addClass('filter--is-focused')
            }
        )
    }

    componentDidMount() {
        if ((this.props.match.params.type === 'ingredients') ||
            (this.props.match.params.type === 'products')
        ) {
            this.databaseContentType = this.props.match.params.type
            this.setSorter(this.sorters[this.databaseContentType][0])
        } else {
            this.setState({isPageNotFound: true})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.type !== 'ingredients' &&
                nextProps.match.params.type !== 'products') {
            this.setState({isPageNotFound: true})
        } else if (this.props.match.params.type !== nextProps.match.params.type) {
            this.databaseContentType = nextProps.match.params.type
            this.setSorter(this.sorters[this.databaseContentType][0])
        }
    }

    render() {
        if (this.state.isPageNotFound) return <NotFound />
        else if (this.state.pageSorter === null) return null
        else {
            return (
                <div className="container">
                    <div
                        className="row justify-content-between align-items-center"
                        id="database__container__buttons__filter"
                    >
                        <h3 className="">{this.databaseContentType}</h3>
                        <div className="text-right">
                            <span className="text-muted">Sort by</span>
                            <span className="btn-toolbar">
                                {this.sorters[this.databaseContentType]
                                    .map((sorter, index) =>
                                        <SortButton
                                            key={index}
                                            name={sorter}
                                            sort={() => this.setSorter(sorter)}
                                        />
                                    )
                                }
                            </span>
                        </div>
                    </div>
                    <DatabaseSorter sorter={this.state.pageSorter} />
                </div>
            )
        }
    }
}
