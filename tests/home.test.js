'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { DropDown } from '../src/js/home/components/SearchBar.jsx'


describe('Home page - Search bar', function () {

    it('should hide dropdown if no user input', function () {
        let dropdown = shallow(<DropDown />).setState({input: ''})
        expect(dropdown.find("#search-bar__dropdown")).to.have.length(0)
    })

    it('should show dropdown if user input', function () {
        let dropdown = shallow(<DropDown />).setState({input: 'test'})
        expect(dropdown.find("#search-bar__dropdown")).to.have.length(1)
    })

})
