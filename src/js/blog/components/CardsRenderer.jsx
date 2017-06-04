import React from 'react'

import CardCondensed from './CardCondensed.jsx'
import LoadingAnimation from '../../shared/LoadingAnimation.jsx'
import {
    fetchArticles,
    hasFetchedArticles,
    fetchNews,
    hasFetchedNews,
} from '../../../configEvents.js'


function ColumnRenderer(props) {
    return (
        <div className="col-md-6 col-sm-6 col-8">
            {props.column.map((card) =>
                <CardCondensed
                    key={card.id}
                    card={card}
                    blogContentType={props.blogContentType}
                />
            )}
        </div>
    )
}


export default class CardsRenderer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            type: null,
            cards: [],
            isEndOfLoadMore: false,
        }
        this.isAsc = false
        this.appendContent = false
        this.maxResults = 6
        this.offset = 0
        this.fetch = this.fetch.bind(this)
        this.hasFetched = this.hasFetched.bind(this)
        this.handleLoadMore = this.handleLoadMore.bind(this)
        this.createMasonryLayout = this.createMasonryLayout.bind(this)
    }

    fetch(type, isAsc, offset) {
        window.dispatchEvent(new CustomEvent(
            (type === 'articles' ? fetchArticles : fetchNews),
            {detail: {
                limit: this.maxResults,
                offset: offset,
                order: [(isAsc ? 'date' : '-date')],
            }}
        ))
    }

    hasFetched(event) {
        if (event.detail.data.length !== 0) {
            let type = (event.type === 'hasFetchedArticles' ? 'articles' : 'news')
            if (this.appendContent) {
                this.setState({
                    type: type,
                    cards: this.state.cards.concat(event.detail.data),
                    isEndOfLoadMore: false,
                })
            } else {
                this.setState({
                    type: type,
                    cards: event.detail.data,
                    isEndOfLoadMore: false,
                })
            }
        } else { // End of load more
            this.setState({isEndOfLoadMore: true})
        }
    }

    handleLoadMore() {
        if (!this.state.isEndOfLoadMore) {
            this.offset += this.maxResults
            this.appendContent = true
            this.fetch(this.state.type, this.isAsc, (this.offset))
        }
    }

    createMasonryLayout(list) {
        /*
            Create Masonry layout by mapping cards to two columns.
            [A, B, C, D, E] would give
            column1 = [A, C, E]
            column2 = [B, D]
            Final render:
                [A, B]
                [C, D]
                [E]
        */
        let columnsList = []
        let nbOfColumns = 2
        for (let colIndex = 0; colIndex < nbOfColumns; colIndex++) {
            let column = []
            for (let cardIndex = 0;
                cardIndex + colIndex < list.length;
                cardIndex += nbOfColumns
            ) {
                column.push(list[cardIndex + colIndex])
            }
            columnsList.push(column)
        }
        return columnsList
    }

    componentDidMount() {
        window.addEventListener(hasFetchedArticles, this.hasFetched)
        window.addEventListener(hasFetchedNews, this.hasFetched)
        this.fetch(
            this.props.filters.blogContentType,
            this.props.filters.isOrderAsc,
            0
        )
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.appendContent = false
            this.isAsc = nextProps.filters.isOrderAsc
            this.offset = 0
            this.fetch(
                nextProps.filters.blogContentType,
                nextProps.filters.isOrderAsc,
                0
            )
        }
    }

    componentWillUnmount() {
        window.removeEventListener(hasFetchedArticles, this.hasFetched)
        window.removeEventListener(hasFetchedNews, this.hasFetched)
    }

    render() {
        if (this.state.cards.length === 0) return <LoadingAnimation />
        let columnsList = this.createMasonryLayout(this.state.cards)
        return (
            <div>
                <div className="row blog__cards-panel">
                    {columnsList.map((column, index) =>
                        <ColumnRenderer
                            key={index}
                            column={column}
                            blogContentType={this.state.type}
                        />
                    )}
                </div>
                <div className="row" id="blog__button__infinite-scroll">
                    <button
                        className="btn btn-secondary btn-sm"
                        type="button"
                        onClick={this.handleLoadMore}
                    >
                        {this.state.isEndOfLoadMore ? (
                            'Nothing to load'
                        ) : (
                            'Load more...'
                        )}
                    </button>
                </div>
            </div>
        )
    }
}
