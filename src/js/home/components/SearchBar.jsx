import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import $ from 'jquery'

import { BadgeRenderer } from '../../shared/ScoreContainer.jsx'
import {
    fetchIngredientsByName,
    hasFetchedIngredientsByName,
    fetchProductsByName,
    hasFetchedProductsByName,
    fetchSingleIngredientByName,
    hasFetchedSingleIngredientByName,
    fetchSingleProductByName,
    hasFetchedSingleProductByName,
} from '../../../configEvents.js'


function ResultBar(props) {

    let url
    let name
    let type
    let hasBadge
    let hasType

    if (props.type === 'product' || props.type === 'ingredient') {
        name = props.matchElement.name.toLowerCase()
        url = (props.type === 'product' ? (
            '/database/products/'
        ) : (
            '/database/ingredients/'
        )) + props.matchElement.id
        type = (props.type === 'product' ? 'Product' : 'Ingredient')
        hasBadge = true
        hasType = true
    } else {
        name = props.matchElement
        url = '/notfound/'
        type = ''
        hasBadge = false
        hasType = false
    }

    return (
        <div className="card-block search-bar__result">
            <Link to={url} className="search-bar__result-name">
                {name}
                {hasBadge ? (
                    <BadgeRenderer
                        title={'CLD score: '}
                        score={Math.round(
                            props.matchElement['quality_price_ratio']
                        )}
                    />
                ) : ''}
            </Link>
            {hasType ? (
                <div className={"search-bar__result--" + props.type}>
                    {type}
                </div>
            ) : ''}
        </div>
    )
}


function DropDownHelpers(props) {
    return (
        <div className="card-block search-bar__result-fixed-link">
            <Link to={"/database/" + props.type}>{props.title}</Link>
        </div>
    )
}


export class DropDown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            input: '',
            ingredientsMatch: [],
            productsMatch: [],
        }
        this.timeoutId = null
        this.fetch = this.fetch.bind(this)
        this.hasFetched = this.hasFetched.bind(this)
    }


    fetch(startsWith) {
        window.clearTimeout(this.timeoutId)
        if (startsWith.length !== 0) {
            this.timeoutId = window.setTimeout(
                function () {
                    window.dispatchEvent(new CustomEvent(
                        fetchIngredientsByName,
                        {detail: {
                            name: startsWith,
                            limit: 2,
                        }}
                    ))
                    window.dispatchEvent(new CustomEvent(
                        fetchProductsByName,
                        {detail: {
                            name: startsWith,
                            limit: 2,
                        }}
                    ))
                }
            , 200)
        } else {
            this.setState({
                ingredientsMatch: [],
                productsMatch: [],
            })
        }
    }

    hasFetched(event) {
        if (this.state.input) {
            if (event.type === hasFetchedIngredientsByName) {
                this.setState({ingredientsMatch: event.detail.data})
            }
            if (event.type === hasFetchedProductsByName) {
                this.setState({productsMatch: event.detail.data})
            }
        }
    }

    componentDidMount() {
        window.addEventListener(hasFetchedIngredientsByName, this.hasFetched)
        window.addEventListener(hasFetchedProductsByName, this.hasFetched)
        if (this.props.input.length !== 0) {
            this.setState(
                {input: this.props.input},
                function () { this.fetch(this.props.input) }
            )
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.input !== nextProps.input) {
            this.setState(
                {input: nextProps.input},
                function () { this.fetch(nextProps.input) }
            )
        }
    }

    componentWillUnmount() {
        window.removeEventListener(
            hasFetchedIngredientsByName,
            this.hasFetched
        )
        window.removeEventListener(
            hasFetchedProductsByName,
            this.hasFetched
        )
    }

    render() {
        if (!this.state.input) return null
        return (
            <div
                id="search-bar__dropdown"
                aria-labelledby="Search bar results"
                className="card"
            >
                {(this.state.ingredientsMatch.length === 0 &&
                    this.state.productsMatch.length === 0) ? (
                    <ResultBar matchElement={'No results'} />
                ) : (
                    <div>
                        {this.state.ingredientsMatch.map(
                            (matchElement) =>
                                <ResultBar
                                    key={matchElement.id}
                                    matchElement={matchElement}
                                    type={'ingredient'}
                                />
                        )}
                        {this.state.productsMatch.map(
                            (matchElement) =>
                                <ResultBar
                                    key={matchElement.id}
                                    matchElement={matchElement}
                                    type={'product'}
                                />
                        )}
                    </div>
                )}
                <div className="dropdown-divider"></div>
                <DropDownHelpers
                    type='ingredients'
                    title='See all ingredients'
                />
                <div className="dropdown-divider"></div>
                <DropDownHelpers
                    type='products'
                    title='See all products'
                />
            </div>
        )
    }

}

export class SearchBarContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
            location: null,
        }
        this.$searchBar = null
        this.searchWord = this.searchWord.bind(this)
        this.handleEnterKey = this.handleEnterKey.bind(this)
        this.handleDropdown = this.handleDropdown.bind(this)
        this.fetch = this.fetch.bind(this)
        this.hasFetchedSearchedWord = this.hasFetchedSearchedWord.bind(this)
    }

    fetch(event, startsWith) {
        window.dispatchEvent(new CustomEvent(
            event,
            {detail: {name: startsWith}}
        ))
    }

    searchWord() {
        this.setState({
            userInput: this.$searchBar.val(),
        }, function () {
            this.fetch(fetchSingleIngredientByName, this.state.userInput)
            this.fetch(fetchSingleProductByName, this.state.userInput)
        })
    }

    handleEnterKey(event) {
        if (event.keyCode === 13 || event.code === 'Enter') {
            event.preventDefault()
            this.searchWord()
        }
    }

    handleDropdown() {
        this.setState({userInput: this.$searchBar.val()})
    }

    hasFetchedSearchedWord(e) {
        /*
            If a ingredient or a product has been found: go to detailed page
            Else: stay on page and show banner word-not-found
        */
        if (e.detail.data.length !== 0) {
            if (e.type === hasFetchedSingleIngredientByName) {
                this.setState({
                    location: '/database/ingredients/' + e.detail.data[0].id
                })
            } else if (e.type === hasFetchedSingleProductByName) {
                this.setState({
                    location: '/database/products/' + e.detail.data[0].id
                })
            }
        } else {
            window.dispatchEvent(new CustomEvent(
                'wordNotFound',
                {detail: {text: this.state.userInput}}
            ))
        }
    }

    componentDidMount() {
        window.addEventListener(
            hasFetchedSingleIngredientByName,
            this.hasFetchedSearchedWord
        )
        window.addEventListener(
            hasFetchedSingleProductByName,
            this.hasFetchedSearchedWord
        )
        this.$searchBar = $('#search-bar__input')
    }

    componentWillUnmount() {
        window.removeEventListener(
            hasFetchedSingleIngredientByName,
            this.hasFetchedSearchedWord
        )
        window.removeEventListener(
            hasFetchedSingleProductByName,
            this.hasFetchedSearchedWord
        )
        window.dispatchEvent(new CustomEvent(
            'removeBanner',
            {detail: {
                banner: 'wordNotFound',
            }}
        ))
        $('#search-bar__dropdown').fadeOut('fast')
    }

    render() {
        if (this.state.location !== null) {
            return <Redirect push to={this.state.location} />
        }
        return (
            <div className="container-fluid" id="parallax__container">
                <div className="row" id="parallax__container__row">
                    <div
                        className="col-md-12"
                        id="parallax__description"
                    >
                        {`Cosmetic Label Decoder helps you find out what's
                        under the cover, based on the International
                        Nomenclature of Cosmetics Ingredients.`}
                    </div>
                    <form
                        className="col-md-12 col-sm-12 col-12 form-inline"
                        id="search-bar__form"
                    >
                        <div className="col-md-6 col-sm-6 col-8" id="search-bar__container">
                            <input
                                type="text"
                                id="search-bar__input"
                                className="form-control"
                                placeholder="Search for an ingredient or a product"
                                aria-label="Search bar"
                                aria-haspopup="true"
                                onKeyDown={this.handleEnterKey}
                                onInput={this.handleDropdown}
                            />
                            <DropDown input={this.state.userInput} />
                        </div>
                        <div
                            className=" col-md-3 col-sm-3 col-4"
                            id="search-bar__button-container"
                        >
                            <button
                                id="search-button"
                                type="button"
                                className="btn cld-btn"
                                onClick={this.searchWord}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
