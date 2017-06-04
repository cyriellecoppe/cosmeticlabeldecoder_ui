'use strict'

import { assert, expect } from 'chai'
import { initParams } from '../src/configEvents.js'
import CldApiClient from '../src/apiClient.js'


describe('Events Manager', function () {

    it('should initialize parameters with event detail parameters', function () {
        let event = {detail: {
            order: 'date',
            limit: 3,
            offset: null,
            year: 2016
        }}
        let defaultParams = {
            order: '-date',
            limit: null,
            offset: null,
            year: null
        }
        let actual = initParams(defaultParams, event)
        let expected = {
            order: 'date',
            limit: 3,
            offset: null,
            year: 2016
        }
        expect(actual).to.eql(expected)
    })

})


describe('ApiClient', function () {

    it('should format HTTP post request parameters', function () {
        let params = {ordering: '-date', limit: 3, offset: 5, date: null}
        let apiClient = new CldApiClient()
        let actualPath = apiClient._formatParams(params)
        let expectedPath = '?ordering=-date&limit=3&offset=5'
        assert.equal(actualPath, expectedPath)
    })

})
