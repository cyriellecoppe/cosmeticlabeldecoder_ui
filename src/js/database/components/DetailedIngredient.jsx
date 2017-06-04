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
    fetchIngredientById,
    hasFetchedIngredientById
} from '../../../configEvents.js'


function IngredientTableRow(props) {
    return (
        <tr>
            <td>{props.title}</td>
            <td className="text-center">
                <i
                className={props.property ? "fa fa-check" : "fa fa-times"}
                aria-hidden="true"
                ></i>
            </td>
        </tr>
    )
}


function DetailedIngredientHeader(props) {
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>{props.name}</h4>
                <div>
                    {props.types.map((type) => (
                        <span
                            key={type}
                            className="database__detailed-ingredient__type"
                        >
                            {type}
                        </span>
                    ))}
                </div>
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
                        <b>{scoresRef.ingredientCldScore.title + ': ' + Math.round(props.globalScore) + '/3'}</b>
                        {scoresRef.ingredientCldScore.description}
                    </div>
                </div>
            </div>
        </div>
    )
}


function DetailedIngredientTable(props) {
    return (
        <div className="row" id="database__detailed-ingredient__table">
            <div className="col-md-4 col-sm-6">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Ingredient origin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <IngredientTableRow
                            title='Chemical'
                            property={props.isChemical}
                        />
                        <IngredientTableRow
                            title='Petrochemical'
                            property={props.isPetrochemical}
                        />
                        <IngredientTableRow
                            title='Vegetable'
                            property={props.isVegetable}
                        />
                        <IngredientTableRow
                            title='Mineral'
                            property={props.isMineral}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    )
}


function DetailedIngredientScores(props) {
    return (
        <div className="row database__detailed-view__scores">
            <div className="col-md-12">
                <ScoreContainer
                    score={props.environmentalScore}
                    type='environmental'
                />
                <ScoreContainer
                    score={props.productionCost}
                    type='productionCost'
                />
                {props.isBiodegradable ? (
                    <div className="text-muted scores">
                        Biodegradable
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </div>
                ) : (
                    <div className="text-muted scores">Not biodegradable</div>
                )}
            </div>
        </div>
    )
}


function DetailedIngredientDescription(props) {
    return (
        <div className="row">
            <div className="col-md-12 database__detailed-view__information-container">
                <span className="text-muted database__detailed-view__information-container__title">
                    Common name:
                </span>
                <span>
                    {props.commonName}
                </span>
            </div>
            <div className="col-md-12 database__detailed-view__information-container">
                <span className="text-muted database__detailed-view__information-container__title">
                    Description:
                </span>
                <span>
                    {props.description}
                </span>
            </div>
            <div className="col-md-12 database__detailed-view__information-container">
                <span className="text-muted database__detailed-view__information-container__title">
                    Related products:
                </span>
                <div id="database__detailed-ingredient__product-content">
                    {props.products.length !== 0 ? (
                        props.products.map((product) =>
                        <Link
                            to={"/database/products/" + product.id}
                            key={product.id}
                            className="card"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="card-img-top"
                            />
                            <div className="card-footer">
                                <span className="card-footer--title">
                                    {product.name.toLowerCase()}
                                </span>
                                <BadgeRenderer
                                    title='Cld score: '
                                    score={Math.round(
                                        product.quality_price_ratio
                                    )}
                                />
                            </div>
                        </Link>
                    )) : (
                        <span className="text-muted">No related products found</span>
                    )}
                </div>
            </div>
        </div>
    )
}


export default class DetailedIngredient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            name: null,
            commonName: null,
            description: null,
            isBiodegradable: false,
            isVegetable: false,
            isMineral: false,
            isChemical: false,
            isPetrochemical: false,
            globalScore: null,
            productionCost: null,
            environmentalScore: null,
            types: [],
            products: [],
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
                commonName: res.common_name,
                description: res.description,
                isBiodegradable: res.is_biodegradable,
                isVegetable: res.is_vegetable,
                isMineral: res.is_mineral,
                isChemical: res.is_chemical,
                isPetrochemical: res.is_petrochemical,
                globalScore: res.quality_price_ratio,
                productionCost: res.production_cost,
                environmentalScore: res.environmental_score,
                types: res.types,
                products: res.products,
                pageNotFound: false,
            })
        } else {
            this.setState({pageNotFound: true})
        }
    }


    componentDidMount() {
        window.addEventListener(hasFetchedIngredientById, this.hasFetched)
        window.dispatchEvent(new CustomEvent(
            fetchIngredientById,
            {detail: {
                id: this.props.match.params.id,
            }}
        ))
    }

    componentWillUnmount() {
        window.removeEventListener(hasFetchedIngredientById, this.hasFetched)
    }

    render() {
        if (this.state.pageNotFound) return <NotFound />
        else {
            return (
                <div className="row" id="database__detailed-ingredient__container">
                    <div className="col-md-12 set-col-max-width">
                        <DetailedIngredientHeader
                            name={this.state.name}
                            types={this.state.types}
                            globalScore={this.state.globalScore}
                        />
                        <DetailedIngredientTable
                            isVegetable={this.state.isVegetable}
                            isMineral={this.state.isMineral}
                            isChemical={this.state.isChemical}
                            isPetrochemical={this.state.isPetrochemical}
                        />
                        <DetailedIngredientScores
                            environmentalScore={this.state.environmentalScore}
                            productionCost={this.state.productionCost}
                            isBiodegradable={this.state.isBiodegradable}
                        />
                        <DetailedIngredientDescription
                            commonName={this.state.commonName}
                            description={this.state.description}
                            products={this.state.products}
                        />
                        <ScoreInformation />
                    </div>
                </div>
            )
        }
    }
}
