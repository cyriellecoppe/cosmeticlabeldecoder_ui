/*  Interface configuration for managing interactions between website
    components and an API client

    - Why

    The API client can be strongly intertwined with website UI components. This
    interface purpose is to decouple them and ease UI and API client
    maintenance, by making them independent.

        Components  <---->  Interface  <----->  API client <-----> API

    - How

    This paradigm is based on this article :
    https://tech.polyconseil.fr/code-your-js-app-like-its-86.html

    The config event is called from the main loop and sets up event listeners.
        1 - Components dispatch events when they need data and set up event
            listeners to catch the interface response.
        2 - The event is caught by the interface event listeners.
        3 - The interface transforms the event received to calls to the API
            client.
        4 - The API client interacts with the API and executes the
            interface callback.
        5 - The interface callback fires an event containing the data.
        6 - The component catches the interface event.
        7 - The component is updated according to the response.

    The interface outlines the dependencies between the API client and the UI components.

*/


'use strict'
import CldApiClient from './apiClient.js'


const ApiClient = new CldApiClient()

/* GET events */

export const fetchArticles = 'fetchArticles'
export const hasFetchedArticles = 'hasFetchedArticles'

export const fetchArticleById = 'fetchArticleById'
export const hasFetchedArticleById = 'hasFetchedArticleById'

export const fetchBrands = 'fetchBrands'
export const hasFetchedBrands = 'hasFetchedBrands'

export const fetchCategories = 'fetchCategories'
export const hasFetchedCategories = 'hasFetchedCategories'

export const fetchCertifications = 'fetchCertifications'
export const hasFetchedCertifications = 'hasFetchedCertifications'

export const fetchIngredients = 'fetchIngredients'
export const hasFetchedIngredients = 'hasFetchedIngredients'

export const fetchIngredientById = 'fetchIngredientById'
export const hasFetchedIngredientById = 'hasFetchedIngredientById'

export const fetchIngredientsByName = 'fetchIngredientsByName'
export const hasFetchedIngredientsByName = 'hasFetchedIngredientsByName'

export const fetchNews = 'fetchNews'
export const hasFetchedNews = 'hasFetchedNews'

export const fetchNewsById = 'fetchNewsById'
export const hasFetchedNewsById = 'hasFetchedNewsById'

export const fetchProducts = 'fetchProducts'
export const hasFetchedProducts = 'hasFetchedProducts'

export const fetchProductById = 'fetchProductById'
export const hasFetchedProductById = 'hasFetchedProductById'

export const fetchProductsByName = 'fetchProductsByName'
export const hasFetchedProductsByName = 'hasFetchedProductsByName'

export const fetchSingleIngredientByName = 'fetchSingleIngredientByName'
export const hasFetchedSingleIngredientByName = 'hasFetchedSingleIngredientByName'

export const fetchSingleProductByName = 'fetchSingleProductByName'
export const hasFetchedSingleProductByName = 'hasFetchedSingleProductByName'

export const fetchTypes = 'fetchTypes'
export const hasFetchedTypes = 'hasFetchedTypes'

/* POST events */

export const subscribe = 'subscribe'
export const sendFeedback = 'sendFeedback'


function httpGetSuccess(eventToDispatch) {
    function success(data) {
        window.dispatchEvent(new CustomEvent(
            eventToDispatch,
            {detail: {
                data: data.results,
            }}
        ))
        window.dispatchEvent(new CustomEvent(
            'removeBanner',
            {detail: {
                banner: 'connectionError',
            }}
        ))
    }
    return success
}


function httpGetFail() {
    window.dispatchEvent(new Event('connectionError'))
}


function httpPostSuccess(eventToDispatch) {
    function success() {
        window.dispatchEvent(new Event(eventToDispatch))
    }
    return success
}

function httpPostFail(eventToDispatch) {
    function fail(jqXHR, textStatus, errorMessage) {
        if (jqXHR.responseText !== null) {
            let message = JSON.parse(jqXHR.responseText)
            let errors = []
            for (let error in message) {
                errors.push(error + ': ' + message[error])
            }
            window.dispatchEvent(new CustomEvent(
                eventToDispatch,
                {detail: {text: errors.join(', ')}}
            ))
        } else {
            window.dispatchEvent(new CustomEvent(
                eventToDispatch,
                {detail: {text: errorMessage}}
            ))
        }
    }
    return fail
}

export function initParams(allowedParams, event) {
    if ('detail' in event) {
        for (let p in allowedParams) {
            if (event.detail.hasOwnProperty(p)) {
                allowedParams[p] = event.detail[p]
            }
        }
    }
    return allowedParams
}


export function configEvents() {

    window.addEventListener(fetchArticles, function (e) {
        let allowedParams = {
            order: '-date',
            limit: null,
            offset: null,
            year: null,
        }
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedArticles)
        ApiClient.fetchArticles(
            params.order,
            params.limit,
            params.offset,
            params.year,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchArticleById, function (e) {
        let callbackSuccess = httpGetSuccess(hasFetchedArticleById)
        ApiClient.fetchArticleById(e.detail.id, callbackSuccess, httpGetFail)
    })

    window.addEventListener(fetchNews, function (e) {
        let allowedParams = {
            order: '-date',
            limit: null,
            offset: null,
            year: null,
        }
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedNews)
        ApiClient.fetchNews(
            params.order,
            params.limit,
            params.offset,
            params.year,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchNewsById, function (e) {
        let callbackSuccess = httpGetSuccess(hasFetchedNewsById)
        ApiClient.fetchNewsById(e.detail.id, callbackSuccess, httpGetFail)
    })

    window.addEventListener(fetchBrands, function (e) {
        let allowedParams = {order: 'name', limit: null, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedBrands)
        ApiClient.fetchBrands(
            params.order,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchCategories, function (e) {
        let allowedParams = {order: 'name', limit: null, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedCategories)
        ApiClient.fetchCategories(
            params.order,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchCertifications, function (e) {
        let allowedParams = {order: 'name', limit: null, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedCertifications)
        ApiClient.fetchCertifications(
            params.order,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchIngredients, function (e) {
        let allowedParams = {order: 'name', limit: null, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedIngredients)
        ApiClient.fetchIngredients(
            params.order,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchIngredientById, function (e) {
        let callbackSuccess = httpGetSuccess(hasFetchedIngredientById)
        ApiClient.fetchIngredientById(e.detail.id, callbackSuccess, httpGetFail)
    })

    window.addEventListener(fetchIngredientsByName, function (e) {
        let allowedParams = {name: null, limit: null, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedIngredientsByName)
        ApiClient.fetchIngredientsByName(
            params.name,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchProducts, function (e) {
        let allowedParams = {order: 'name', limit: null, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedProducts)
        ApiClient.fetchProducts(
            params.order,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchProductById, function (e) {
        let callbackSuccess = httpGetSuccess(hasFetchedProductById)
        ApiClient.fetchProductById(e.detail.id, callbackSuccess, httpGetFail)
    })

    window.addEventListener(fetchProductsByName, function (e) {
        let allowedParams = {name: null, limit: null, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedProductsByName)
        ApiClient.fetchProductsByName(
            params.name,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchSingleIngredientByName, function (e) {
        let allowedParams = {name: null, limit: 1, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedSingleIngredientByName)
        ApiClient.fetchIngredientsByName(
            params.name,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchSingleProductByName, function (e) {
        let allowedParams = {name: null, limit: 1, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedSingleProductByName)
        ApiClient.fetchProductsByName(
            params.name,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(fetchTypes, function (e) {
        let allowedParams = {order: 'name', limit: null, offset: null}
        let params = initParams(allowedParams, e)
        let callbackSuccess = httpGetSuccess(hasFetchedTypes)
        ApiClient.fetchTypes(
            params.order,
            params.limit,
            params.offset,
            callbackSuccess,
            httpGetFail
        )
    })

    window.addEventListener(sendFeedback, function (e) {
        let callbackSuccess = httpPostSuccess('feedbackSuccess')
        let callbackFail = httpPostFail('sendError')
        ApiClient.sendFeedback(
            e.detail.firstName,
            e.detail.lastName,
            e.detail.email,
            e.detail.comment,
            callbackSuccess,
            callbackFail
        )
    })

    window.addEventListener(subscribe, function (e) {
        let callbackSuccess = httpPostSuccess('subscriptionSuccess')
        let callbackFail = httpPostFail('sendError')
        ApiClient.sendSubscription(
            e.detail.email,
            callbackSuccess,
            callbackFail
        )
    })
}
