import React from 'react'
import { withRouter } from 'react-router'

/*
    Fix issues:
    - On page change, the scroll position does not change.
    - Anchors do not work.
*/

function findElementTopOffset(elementIdOrName) {
    /* eslint max-len: "off" */
    /*
        Find element distance from the top of the page.
        The elements is identified following
        http://w3c.github.io/html/browsers.html#navigating-to-a-fragment-identifier
    */
    let target = document.getElementById(elementIdOrName)
    if (target === undefined) {
        target = document.getElementsByName(elementIdOrName)[0]
    }
    if (target) {
        return target.getBoundingClientRect().top + window.scrollY
    }
    return -1
}


function scrollIntoView(anchorName) {
    let targetTop = findElementTopOffset(anchorName)
    window.scrollTo(0, targetTop - 100)
    return targetTop && targetTop > 0
}


class ScrollPositioning extends React.Component {

    componentDidUpdate(prevProps) {
        if (!this.props.location.hash || this.props.location.hash === '#') {
            window.scrollTo(0, 0)
        } else {
            let anchorName = this.props.location.hash.substring(1)
            if (!scrollIntoView(anchorName)) {
                window.requestAnimationFrame(scrollIntoView)
                /*
                    Element not there after second attempt: abandon.
                    Otherwise, user might have started to scroll.
                */
            }
        }
    }

    render() {
        return this.props.children
    }
}

export default withRouter(ScrollPositioning)
