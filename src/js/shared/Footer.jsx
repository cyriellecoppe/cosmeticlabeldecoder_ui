import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

import { subscribe } from '../../configEvents.js'


function BottomLink(props) {
    return (
        <div className="col-md-3 col-sm-3 col-12 footer__bottom-link">
            <Link to={props.bottomLink.url}>{props.bottomLink.title}</Link>
        </div>
    )
}


function BottomLinksRenderer(props) {
    return (
        <div className="container-fluid" role="contentinfo">
            <div className="row" id="footer__container">
                {props.bottomLinks.map((bottomLinkElement) =>
                    <BottomLink
                        key={bottomLinkElement.title}
                        bottomLink={bottomLinkElement}
                    />
                )}
            </div>
        </div>
    )
}


function SocialButton(props) {
    return (
        <span
            className="fa-stack fa-lg sub-footer__social-icons"
            id={'sub-footer__social-icons--' + props.socialButton}
        >
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className={props.socialButton + " fa fa-stack-1x fa-inverse"}>
            </i>
        </span>
    )
}


class SocialButtonsRenderer extends React.Component {

    constructor(props) {
        super(props)
        this.handleAnimation = this.handleAnimation.bind(this)
    }

    handleAnimation() {
        let idElement = '#sub-footer__social-icons--'
        this.props.socialButtons.map(function (icon) {
            $(idElement + icon).addClass(icon + '__animation')
            $(idElement + icon).on(
                'webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function () {
                    $(idElement + icon).removeClass(icon + '__animation')
                }
            )
        })
    }

    render() {
        return (
            <div
                className="col-md-4 col-sm-12 sub-footer__column"
                id="sub-footer__social-icons__container"
                onClick={this.handleAnimation}
            >
                {this.props.socialButtons.map((socialButtonElement) =>
                    <SocialButton
                        key={socialButtonElement}
                        socialButton={socialButtonElement}
                    />
                )}
            </div>
        )
    }
}


export default class Footer extends React.Component {

    constructor(props) {
        super(props)
        this.bottomLinks = [
            {
                'title': 'Send Feedback',
                'url': '/contact#feedback',
            },
            {
                'title': 'Contact',
                'url': '/contact#information',
            },
            {
                'title': 'Website Design',
                'url': '/about#design',
            },
            {
                'title': 'Related Links',
                'url': '/about#links',
            },
        ]
        this.socialButtons = [
            'fa-twitter',
            'fa-facebook',
            'fa-instagram',
            'fa-pinterest-p',
            'fa-envelope',
        ]
        this.handleEnterKey = this.handleEnterKey.bind(this)
        this.handlePost = this.handlePost.bind(this)
    }

    handleEnterKey(event) {
        if (event.keyCode === 13 || event.code === 'Enter') {
            event.preventDefault()
            this.handlePost()
        }
    }

    handlePost() {
        let inputEmail = document.getElementById('form-newsletter__email')
        let form = document.getElementById('sub-footer__form-newsletter')

        if (!form.checkValidity()) {
            inputEmail.focus()
            $('#cld-tooltip__subscription').fadeIn('fast')
            $('#form-newsletter__email').focusout(function () {
                $('#cld-tooltip__subscription').fadeOut('fast')
            })
        } else {
            $('#cld-tooltip__subscription').fadeOut('fast')
            window.dispatchEvent(new CustomEvent(
                subscribe,
                {detail: {
                    email: inputEmail.value,
                }}
            ))
            form.reset()
        }
    }

    componentWillUnmount() {
        $('#cld-tooltip__subscription').fadeOut('fast')
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row" id="sub-footer__container">
                    <div className="col-md-4 col-sm-12 sub-footer__column">
                        <h3>Contact</h3>
                        <p>Phone: 012-345-6789</p>
                        <p>E-mail: cld@franek.fr</p>
                    </div>
                    <SocialButtonsRenderer
                        socialButtons={this.socialButtons}
                    />
                    <div className="col-md-4 col-sm-12 sub-footer__column">
                        <h3>Stay informed</h3>
                        <p>
                            Sign up to get the latest updates, new releases
                            <Link
                                to="/blog"
                                id="sub-footer__newsletter-information"
                            > and more...</Link>
                        </p>
                        <form id="sub-footer__form-newsletter">
                            <div
                                className="cld-tooltip__form--required alert alert-danger"
                                role="alert"
                                id="cld-tooltip__subscription"
                            >
                                <i
                                    className="fa fa-exclamation-triangle"
                                    aria-hidden="true"
                                ></i>
                                A valid email is required.
                            </div>
                            <input
                                className="form-control"
                                required
                                id="form-newsletter__email"
                                type="email"
                                name="email"
                                aria-label="email for newsletter subscription"
                                placeholder="name@example.com"
                                onKeyDown={this.handleEnterKey}
                            />
                            <button
                                type="button"
                                className="btn cld-btn"
                                onClick={this.handlePost}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <BottomLinksRenderer
                    bottomLinks={this.bottomLinks}
                />
            </div>
        )
    }
}
