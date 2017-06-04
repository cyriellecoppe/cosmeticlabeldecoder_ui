import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import CardsRenderer from '../src/js/blog/components/CardsRenderer.jsx'
import readJSONFile from './utils.js'


describe('Blog page', function () {

    it('should create Masonry layout', function () {
        let cardsRenderer = shallow(<CardsRenderer />)
        let newsJSON = readJSONFile('news.json')
        let newsExpected = readJSONFile('newsFormatted.json')
        let hasMasonryLayout = newsJSON
            .then(
                (data) => cardsRenderer.instance().createMasonryLayout(data),
                (error) => error
            )
            .then(
                (actualResult) => {
                    let hasFormatted = newsExpected.then(
                        (expData) => { expect(expData).to.eql(actualResult) },
                        (error) => { expect.fail(null, null, error) }
                    )
                    return hasFormatted
                }, (error) => { expect.fail(null, null, error) }
            )
        return hasMasonryLayout
    })

})
