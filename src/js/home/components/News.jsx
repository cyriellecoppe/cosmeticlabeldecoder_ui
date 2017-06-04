import React from 'react'
import { Link } from 'react-router-dom'

import LoadingAnimation from '../../shared/LoadingAnimation.jsx'
import { fetchNews, hasFetchedNews } from '../../../configEvents.js'


function NewsRenderer(props) {
    // Format date from 'YYYY-MM-DD' to 'month DD, YYYY'
    let formattedDate = new Date(props.news.date).toLocaleDateString(
        'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }
    )

    return (
        <div className="latest-news__news-row">
            <span className="latest-news__news-date">{formattedDate}</span>
            <Link
                to={"/blog/news/" + props.news.id}
                className="latest-news__news-title"
                title="Read more about this news"
            >
                {props.news.title}
            </Link>
            <span className="latest-news__news-topics">
                {props.news.category}
            </span>
        </div>
    )
}

export default class NewsContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            news: [],
        }
        this.hasFetched = this.hasFetched.bind(this)
    }

    hasFetched(event) {
        if (event.detail.data.length !== 0) {
            this.setState({news: event.detail.data})
        }
    }

    componentDidMount() {
        window.addEventListener(hasFetchedNews, this.hasFetched)
        window.dispatchEvent(new CustomEvent(fetchNews, {detail: {limit: 5}}))
    }

    componentWillUnmount() {
        window.removeEventListener(hasFetchedNews, this.hasFetched)
    }

    render() {
        if (this.state.news.length === 0) return <LoadingAnimation />
        return (
            <div className="container" id="latest-news__container">
                <h2>Latest news</h2>
                {this.state.news.map((newsItem) =>
                    <NewsRenderer
                        key={newsItem.id}
                        news={newsItem}
                    />
                )}
            </div>
        )
    }
}
