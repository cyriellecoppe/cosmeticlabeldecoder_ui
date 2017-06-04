import React from 'react'

import NotFound from '../../shared/NotFound.jsx'
import {
    fetchArticleById,
    hasFetchedArticleById,
    fetchNewsById,
    hasFetchedNewsById,
} from '../../../configEvents.js'


export default class CardDetailed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            card: {},
            pageNotFound: false,
        }
        this.fetch = this.fetch.bind(this)
        this.hasFetched = this.hasFetched.bind(this)
    }

    fetch(event, id) {
        window.dispatchEvent(new CustomEvent(
            event,
            {detail: {
                id: id,
            }}
        ))
    }

    hasFetched(event) {
        if (event.detail.data.length !== 0) {
            this.setState({
                card: event.detail.data[0],
                pageNotFound: false,
            })
        } else {
            this.setState({pageNotFound: true})
        }
    }

    componentDidMount() {
        if (this.props.match.params.type === 'articles') {
            window.addEventListener(hasFetchedArticleById, this.hasFetched)
            this.fetch(fetchArticleById, this.props.match.params.id)
        } else if (this.props.match.params.type === 'news') {
            window.addEventListener(hasFetchedNewsById, this.hasFetched)
            this.fetch(fetchNewsById, this.props.match.params.id)
        } else {
            this.setState({pageNotFound: true})
        }
    }

    componentWillUnmount() {
        window.removeEventListener(hasFetchedArticleById, this.hasFetched)
        window.removeEventListener(hasFetchedNewsById, this.hasFetched)
    }

    render() {
        if (this.state.pageNotFound) return <NotFound />
        else {
            return (
                <div className="row justify-content-center">
                    <div className="set-col-max-width col-md-10 col-sm-10 col-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row justify-content-between align-items-center">
                                    <span id="blog__card-detailed__title">
                                        {this.state.card.title}
                                    </span>
                                    {this.state.card.hasOwnProperty('category') ? (
                                        <span id="blog__card-detailed__category">
                                            {this.state.card.category}
                                        </span>
                                    ) : ''}
                                </div>
                            </div>
                            <div className="card-block">
                                <div className="text-muted" id="blog__card-detailed__summary">
                                    {this.state.card.summary}
                                </div>
                                {this.state.card.hasOwnProperty('images') ? (
                                    <div className="text-center">
                                        <img
                                            className="col-md-5 col-sm-6 col-10"
                                            id="blog__card-detailed__image"
                                            src={this.state.card.images[0].image}
                                            alt={this.state.card.images[0].title}
                                        />
                                    </div>
                                ) : ''}
                                <p id="blog__card-detailed__description">
                                    {this.state.card.description}
                                </p>
                            </div>
                            <div className="card-footer text-muted text-right">
                                {this.state.card.date}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
