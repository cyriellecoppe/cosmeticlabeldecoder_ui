import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

import LoadingAnimation from '../../shared/LoadingAnimation.jsx'
import { fetchArticles, hasFetchedArticles } from '../../../configEvents.js'


function CarouselIndicators(props) {
    return (
        <li
            data-target={props.target}
            data-slide-to={props.pageNumber.toString()}
            className={props.pageNumber === 0 ? 'active' : ''}
        ></li>
    )
}


function ArticleCard(props) {
    return (
        <Link
            to={"/blog/articles/" + props.article.id}
            className="col-md-4 col-sm-8"
            title="Read more about this article"
        >
            <img
                className="latest-articles__article-card__image"
                alt={props.article.images[0].title}
                src={props.article.images[0].image}
            />
                <h4>{props.article.title}</h4>
                <p className="latest-articles__article-card__summary">
                    {props.article.summary}
                </p>
        </Link>
    )
}


function ArticlesRenderer(props) {
    // Bootstrap class required for first element
    let classRow = "row justify-content-around text-center carousel-item"
    if (props.index === 0) {
        classRow += " active"
    }
    return (
        <div className={classRow}>
            {props.articlesList.map((articleItem) =>
                <ArticleCard
                    key={articleItem.id}
                    article={articleItem}
                />
            )}
        </div>
    )
}


export default class ArticlesContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            showCarousel: false,
        }
        this.nbOfArticlesPerPanel = 3
        this.carouselNumberOfArticles = 9
        this.hasFetched = this.hasFetched.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.toggleCarousel = this.toggleCarousel.bind(this)
    }

    hasFetched(event) {
        if (event.detail.data.length !== 0) {
            let data = event.detail.data
            let articlesRows = []
            let startIndex = 0
            let endIndex = startIndex + this.nbOfArticlesPerPanel

            // Group articles by carousel panel
            while (endIndex <= this.carouselNumberOfArticles) {
                articlesRows.push(data.slice(startIndex, endIndex))
                startIndex += this.nbOfArticlesPerPanel
                endIndex += this.nbOfArticlesPerPanel
            }

            this.setState({articles: articlesRows})
        }
    }

    toggleCarousel() {
        if (window.innerWidth < 768) {
            $('#latest-articles__carousel').carousel('pause')
            this.setState({showCarousel: false})
        } else {
            $('#latest-articles__carousel').carousel('cycle')
            this.setState({showCarousel: true})
        }
    }

    handleResize() {
        window.setTimeout(this.toggleCarousel, 100)
    }

    componentDidMount() {
        window.addEventListener(hasFetchedArticles, this.hasFetched)
        window.addEventListener('resize', this.handleResize)
        window.dispatchEvent(new CustomEvent(
            fetchArticles,
            {detail: {
                limit: this.carouselNumberOfArticles,
            }}
        ))
        this.toggleCarousel()
    }

    componentWillUnmount() {
        window.removeEventListener(hasFetchedArticles, this.hasFetched)
        window.removeEventListener('resize', this.handleResize)
    }

    render() {
        if (this.state.articles.length === 0) return <LoadingAnimation />
        else {
            if (this.state.showCarousel) {
                let indicators = []
                let nbOfPages = (
                    this.carouselNumberOfArticles / this.nbOfArticlesPerPanel
                )
                for (let page = 0; page < nbOfPages; page++) {
                    indicators.push(
                        <CarouselIndicators
                            key={page}
                            pageNumber={page}
                            target='#latest-articles__carousel'
                        />
                    )
                }
                return (
                    <div className="container" id="latest-articles__container">
                        <div
                            className="carousel slide"
                            data-ride="carousel"
                            id="latest-articles__carousel"
                        >
                            <div className="carousel-inner" role="listbox">
                                {this.state.articles.map((row, index) =>
                                    <ArticlesRenderer
                                        key={index}
                                        index={index}
                                        articlesList={row}
                                    />
                                )}
                            </div>
                            <ol className="carousel-indicators row latest-articles__carousel__indicator">
                                {indicators}
                            </ol>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="container" id="latest-articles__container">
                        <div id="latest-articles__no-carousel">
                            {this.state.articles.map((row, index) =>
                                <ArticlesRenderer
                                    key={index}
                                    index={index}
                                    articlesList={row}
                                />
                            )}
                        </div>
                    </div>
                )
            }
        }
    }
}
