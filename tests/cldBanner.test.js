'use strict'

import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { CldBanner } from '../src/js/shared/CldBanner.jsx'


describe('Banner', function () {

    it('should display connection error banner on event', function () {
        let bannerComponent = mount(<CldBanner />)
        let event = new window.Event('connectionError')
        window.dispatchEvent(event)
        expect(bannerComponent.find('BannerRenderer').render().find('#cld-banner__connection-error')).to.have.lengthOf(1)
    })

    it('should remove banner on click', function () {
        let bannerComponent = mount(<CldBanner />)
        let event = new window.Event('connectionError')
        window.dispatchEvent(event)
        let bannerError = bannerComponent.find('BannerRenderer')
        bannerError.find('button').simulate('click')
        expect(bannerComponent.state().connectionError.isShown).to.equal(false)
    })

})
