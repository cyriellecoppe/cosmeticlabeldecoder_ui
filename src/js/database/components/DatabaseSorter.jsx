import React from 'react'

import DatabaseRenderer from './DatabaseRenderer.jsx'
import LoadingAnimation from '../../shared/LoadingAnimation.jsx'
import NoResults from '../../shared/NoResults.jsx'

import {
    fetchBrands,
    hasFetchedBrands,
    fetchCategories,
    hasFetchedCategories,
    fetchCertifications,
    hasFetchedCertifications,
    fetchIngredients,
    hasFetchedIngredients,
    fetchTypes,
    hasFetchedTypes,
} from '../../../configEvents.js'


export default class DatabaseSorter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            content: [],
            pageSorter: null,
            isLoading: true,
        }
        this.sortersEvents = {
            'a-z': {
                dispatch: fetchIngredients,
                listen: hasFetchedIngredients,
            },
            brand: {
                dispatch: fetchBrands,
                listen: hasFetchedBrands,
            },
            category: {
                dispatch: fetchCategories,
                listen: hasFetchedCategories,
            },
            certification: {
                dispatch: fetchCertifications,
                listen: hasFetchedCertifications,
            },
            type: {
                dispatch: fetchTypes,
                listen: hasFetchedTypes,
            },
        }
        this.fetch = this.fetch.bind(this)
        this.hasFetched = this.hasFetched.bind(this)
    }

    fetch(sorter) {
        window.dispatchEvent(new Event(this.sortersEvents[sorter].dispatch))
    }

    hasFetched(e) {
        let currentSorter
        for (let sorter in this.sortersEvents) {
            if (e.type === this.sortersEvents[sorter].listen) {
                currentSorter = sorter
            }
        }
        this.setState({
            content: e.detail.data,
            pageSorter: currentSorter,
            isLoading: false,
        })
    }

    componentDidMount() {
        for (let s in this.sortersEvents) {
            window.addEventListener(
                this.sortersEvents[s].listen,
                this.hasFetched
            )
        }
        this.fetch(this.props.sorter)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.fetch(nextProps.sorter)
        }
    }

    componentWillUnmount() {
        for (let s in this.sortersEvents) {
            window.removeEventListener(
                this.sortersEvents[s].listen,
                this.hasFetched
            )
        }
    }

    render() {
        if (this.state.isLoading) return <LoadingAnimation />
        else if (this.state.content.length === 0) return <NoResults />
        else {
            return (
                <DatabaseRenderer
                    content={this.state.content}
                    sorter={this.state.pageSorter}
                />
            )
        }
    }
}
