import { JSDOM } from 'jsdom'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const dom = new JSDOM('<!doctype html><html><body></body></html>')

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop))
    Object.defineProperties(target, props)
}

global.window = dom.window
global.document = dom.window.document
global.CustomEvent = dom.window.CustomEvent

global.navigator = {
    userAgent: 'node.js'
}

copyProps(window, global)

