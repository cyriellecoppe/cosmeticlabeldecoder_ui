'use strict'
import $ from 'jquery'


export default class CldApiClient {

    constructor(application) {
        this.api = '/api'
    }

    _getData(path, callbackSuccess = null, callbackFail = null) {
        $.getJSON(path)
            .done(function (data, textStatus, jqXHR) {
                if (callbackSuccess !== null) {
                    callbackSuccess(data, textStatus, jqXHR)
                }
            })
            .fail(function (jqXHR, textStatus, error) {
                if (callbackFail !== null) {
                    callbackFail(jqXHR, textStatus, error)
                }
            })
    }

    _postData(path, jsonData, callbackSuccess, callbackFail) {
        $.post(path, jsonData, null, 'json')
            .done(function (data, textStatus, jqXHR) {
                callbackSuccess(data, textStatus, jqXHR)
            })
            .fail(function (jqXHR, textStatus, error) {
                callbackFail(jqXHR, textStatus, error)
            })
    }

    _formatParams(params) {
        if (!$.isEmptyObject(params)) {
            let paramsList = []
            for (let p in params) {
                if (params[p] !== null) {
                    paramsList.push(p + '=' + params[p])
                }
            }
            return '?' + paramsList.join('&')
        }
        return ''
    }

    fetchArticles(order = '-date', limit = null, offset = null, year = null,
                  callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            ordering: order,
            limit: limit,
            offset: offset,
            date: year,
        })
        let path = this.api + '/blog/articles/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchArticleById(id, callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({id: id})
        let path = this.api + '/blog/articles/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchBrands(order = 'name', limit = null, offset = null,
                callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            ordering: order,
            limit: limit,
            offset: offset,
        })
        let path = this.api + '/inci/brands/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchCategories(order = 'name', limit = null, offset = null,
                    callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            ordering: order,
            limit: limit,
            offset: offset,
        })
        let path = this.api + '/inci/categories/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchCertifications(order = 'name', limit = null, offset = null,
                        callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            ordering: order,
            limit: limit,
            offset: offset,
        })
        let path = this.api + '/inci/certifications/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchIngredients(order = 'name', limit = null, offset = null,
                     callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            ordering: order,
            limit: limit,
            offset: offset,
        })
        let path = this.api + '/inci/ingredients/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchIngredientsByName(startsWith, limit = null, offset = null,
                            callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            name: startsWith,
            limit: limit,
            offset: offset,
        })
        let path = this.api + '/inci/ingredients/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchIngredientById(id, callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({id: id})
        let path = this.api + '/inci/detailedingredient/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchNews(order = '-date', limit = null, offset = null, year = null,
              callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            ordering: order,
            limit: limit,
            offset: offset,
            date: year,
        })
        let path = this.api + '/blog/news/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchNewsById(id, callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({id: id})
        let path = this.api + '/blog/news/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }


    fetchProducts(order = 'name', limit = null, offset = null,
                  callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            ordering: order,
            limit: limit,
            offset: offset,
        })
        let path = this.api + '/inci/products/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchProductsByName(startsWith, limit = null, offset = null,
                         callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            name: startsWith,
            limit: limit,
            offset: offset,
        })
        let path = this.api + '/inci/products/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchProductById(id, callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({id: id})
        let path = this.api + '/inci/detailedproduct/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    fetchTypes(order = 'name', limit = null, offset = null,
               callbackSuccess = null, callbackFail = null) {
        let formattedParams = this._formatParams({
            ordering: order,
            limit: limit,
            offset: offset,
        })
        let path = this.api + '/inci/types/' + formattedParams
        this._getData(path, callbackSuccess, callbackFail)
    }

    sendFeedback(firstName, lastName, email, comment, callbackSuccess = null,
                 callbackFail = null) {
        let formattedData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            comment: comment
        }
        let path = this.api + '/blog/feedback/'
        this._postData(path, formattedData, callbackSuccess, callbackFail)
    }

    sendSubscription(email, callbackSuccess = null, callbackFail = null) {
        let formattedData = {email: email}
        let path = this.api + '/blog/subscription/'
        this._postData(path, formattedData, callbackSuccess, callbackFail)
    }
}
