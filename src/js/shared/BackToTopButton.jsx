import React from 'react'


export default class BackToTopButton extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasScrolled: false,
        }
        this.handleBackToTop = this.handleBackToTop.bind(this)
    }

    handleBackToTop() {
        window.scrollTo(0, 0)
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            this.setState({hasScrolled: (window.pageYOffset > 100)})
        })
    }

    render() {
        if (!this.state.hasScrolled) return null
        return (
            <button
                id="button__back-to-top"
                onClick={this.handleBackToTop}
                aria-label="back to top button"
            >
                <i className="fa fa-chevron-up"aria-hidden="true"></i>
            </button>
        )
    }
}
