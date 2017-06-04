import React from 'react'
import { Link } from 'react-router-dom'

import NotFound from '../../shared/NotFound.jsx'
import {
    BadgeRenderer,
    ScoreContainer,
    ScoreInformation,
    scoresRef
} from '../../shared/ScoreContainer.jsx'
import {
    fetchProductById,
    hasFetchedProductById
} from '../../../configEvents.js'


function IngredientLink(props) {
    return (
        <div className="database__detailed-product__ingredient__row">
            <Link to={'/database/ingredients/' + props.ingredient.id}
                className={props.ingredient.environmental_score === 3 ? (
                    "database__detailed-product__ingredient--natural"
                ) : (
                    "database__detailed-product__ingredient"
                )}
            >
                {props.ingredient.name}
            </Link>
            <BadgeRenderer
                title={'CLD score: '}
                score={Math.round(props.ingredient.quality_price_ratio)}
            />
        </div>
    )
}


function CertificationLogo(props) {
    let tooltipTitle = (
        props.certification.name +
        ', ' +
        props.certification.country_of_creation
    )
    return (
        <img
            className="database__detailed-product__certification-logo"
            src={props.certification.logo}
            alt={props.certification.name}
            title={tooltipTitle}
        />
    )
}


function DetailedProductHeader(props) {
    return (
        <div className="row">
            <div className="col-md-6 col-sm-6">
                <h4>{props.name}</h4>
                <div>{props.brand}</div>
            </div>
            <div className="col-md-6 col-sm-6" id="cld-score__container">
                <Link
                    id="cld-score__title"
                    data-toggle="collapse"
                    data-target="#score-description__cld-score"
                    to="#score-description__cld-score"
                    aria-expanded="false"
                    aria-controls="score-description__cld-score"
                >
                    CLD score
                </Link>
                <BadgeRenderer
                    title="CLD score: "
                    score={Math.round(props.globalScore)}
                />
                <div className="collapse" id="score-description__cld-score">
                    <div className="card card-block text-muted score-description">
                        <b>
                            {scoresRef.productCldScore.title +
                            ': ' +
                            Math.round(props.globalScore) +
                            '/3'}
                        </b>
                        {scoresRef.productCldScore.description}
                    </div>
                </div>
            </div>
        </div>
    )
}


function DetailedProductScores(props) {
    return (
        <div className="row justify-content-center">
            <div className="offset-md-4 col-md-4 text-center col-sm-6">
                <img
                    src={props.image}
                    alt={props.name}
                    id="database__detailed-product__image"
                />
            </div>
            <div className="col-md-4 database__detailed-view__scores">
                <ScoreContainer
                    score={props.priceScore}
                    type='priceScore'
                />
                <ScoreContainer
                    score={props.priceRange}
                    type='priceRange'
                />
                <ScoreContainer
                    score={props.environmentalScore}
                    type='composition'
                />
                {props.isBiodegradable ? (
                    <div className="text-muted scores">
                        Biodegradable
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </div>
                ) : (
                    <div className="text-muted scores score-title">
                        Not biodegradable
                    </div>
                )}
                {props.certifications.map(
                    function (certification) {
                        if (certification.name === "NO CERTIFICATION") {
                            return (
                                <div
                                    className="text-muted scores score-title"
                                    key={certification.id}
                                >
                                    No certification
                                </div>
                            )
                        } else {
                            return (
                                <CertificationLogo
                                    key={certification.id}
                                    certification={certification}
                                />
                            )
                        }
                    }
                )}
            </div>
        </div>
    )
}


function DetailedProductDescription(props) {
    return (
        <div className="row">
            <div className="col-md-12 database__detailed-view__information-container">
                <span className="text-muted database__detailed-view__information-container__title">
                    Description:
                </span>
                <span>{props.description}</span>
            </div>
            <div className="col-md-12 database__detailed-view__information-container">
                <span className="text-muted
                    database__detailed-view__information-container__title">
                    Category:
                </span>
                <span>
                    {props.categories.map((category) =>
                        <span
                            key={category}
                            className="database__detailed-product__category-content"
                        >
                            {category}
                        </span>
                    )}
                </span>
            </div>
            <div className="col-md-12 database__detailed-view__information-container">
                <span className="text-muted database__detailed-view__information-container__title">
                    Ingredients:
                </span>
                <div className="database__detailed-product__ingredient-content">
                    {props.ingredients.length !== 0 ? (
                        props.ingredients.map((ingredient) =>
                            <IngredientLink
                                key={ingredient.id}
                                ingredient={ingredient}
                            />

                    )) : ''}
                </div>
                <div id="database__detailed-product__ingredient--natural__information">
                    *Natural ingredient
                </div>
            </div>
        </div>
    )
}


export default class DetailedProduct extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            name: null,
            description: null,
            priceRange: null,
            priceScore: null,
            globalScore: null,
            environmentalScore: null,
            isBiodegradable: false,
            image: null,
            brand: null,
            ingredients: [],
            categories: [],
            certifications: [],
            pageNotFound: false,
        }
        this.hasFetched = this.hasFetched.bind(this)
    }

    hasFetched(event) {
        if (event.detail.data.length !== 0) {
            let res = event.detail.data[0]
            this.setState({
                id: res.id,
                name: res.name,
                description: res.description,
                globalScore: res.quality_price_ratio,
                priceRange: res.price_range,
                priceScore: res.price_score,
                environmentalScore: res.environmental_score,
                isBiodegradable: res.is_biodegradable,
                image: res.image,
                brand: res.brand,
                ingredients: res.ingredients,
                categories: res.categories,
                certifications: res.certifications,
                pageNotFound: false,
            })
        } else {
            this.setState({pageNotFound: true})
        }
    }

    componentDidMount() {
        window.addEventListener(hasFetchedProductById, this.hasFetched)
        window.dispatchEvent(new CustomEvent(
            fetchProductById,
            {detail: {
                id: this.props.match.params.id,
            }}
        ))
    }

    componentWillUnmount() {
        window.removeEventListener(hasFetchedProductById, this.hasFetched)
    }

    render() {
        if (this.state.pageNotFound) return <NotFound />
        else {
            return (
                <div className="row" id="database__detailed-product__container">
                    <div className="col-md-12 set-col-max-width">
                        <DetailedProductHeader
                            name={this.state.name}
                            brand={this.state.brand}
                            globalScore={this.state.globalScore}
                        />
                        <DetailedProductScores
                            image={this.state.image}
                            name={this.state.name}
                            priceScore={this.state.priceScore}
                            priceRange={this.state.priceRange}
                            environmentalScore={this.state.environmentalScore}
                            isBiodegradable={this.state.isBiodegradable}
                            certifications={this.state.certifications}
                        />
                        <DetailedProductDescription
                            description={this.state.description}
                            categories={this.state.categories}
                            ingredients={this.state.ingredients}
                        />
                        <ScoreInformation />
                    </div>
                </div>
            )
        }
    }
}
