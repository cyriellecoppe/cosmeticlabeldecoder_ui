'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import DatabaseRenderer from '../src/js/database/components/DatabaseRenderer.jsx'
import readJSONFile from './utils.js'


describe('Database page', function () {

    it('should create table layout', function () {
        let databaseRenderer = shallow(<DatabaseRenderer />)
        let categoriesJSON = readJSONFile('categories.json')
        let categoriesExpected = readJSONFile('categoriesFormatted.json')
        let hasTableLayout = categoriesJSON
            .then(
                (data) => databaseRenderer.instance().createTableLayout(data),
                (error) => error
            )
            .then(
                (actualResult) => {
                    let hasFormatted = categoriesExpected.then(
                        (expData) => { expect(expData).to.eql(actualResult) },
                        (error) => { expect.fail(null, null, error) }
                    )
                    return hasFormatted
                }, (error) => { expect.fail(null, null, error) }
            )
        return hasTableLayout
    })

    it('should format ingredients list into A-Z list', function () {
        let databaseRenderer = shallow(<DatabaseRenderer />)
        let ingredientsJSON = readJSONFile('ingredients.json')
        let ingredientsExpected = readJSONFile('ingredientsFormatted.json')
        let hasFormattedList = ingredientsJSON
            .then(
                (data) => databaseRenderer.instance().formatIngredientsList(data),
                (error) => error
            )
            .then(
                (actualResult) => {
                    let hasFormatted = ingredientsExpected.then(
                        (expData) => { expect(expData).to.eql(actualResult) },
                        (error) => { expect.fail(null, null, error) }
                    )
                    return hasFormatted
                }, (error) => { expect.fail(null, null, error) }
            )
        return hasFormattedList
    })

})
