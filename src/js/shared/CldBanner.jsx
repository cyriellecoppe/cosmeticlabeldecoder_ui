import React from 'react'


const bannerDetails = {
    connectionError: {
        id: 'cld-banner__connection-error',
        type: 'alert-danger',
        text: 'Connection error. Please try to reload the page.',
    },
    feedbackSuccess: {
        id: 'cld-banner__feedback-success',
        type: 'alert-success',
        text: 'Thank you for your feedback! It has been submitted.',
    },
    sendError: {
        id: 'cld-banner__send-error',
        type: 'alert-danger',
        text: 'An error occured: ',
    },
    subscriptionSuccess: {
        id: 'cld-banner__subscription-success',
        type: 'alert-success',
        text: `Thank you for your subscription! You should soon
            receive an email.`,
    },
    wordNotFound: {
        id: 'cld-banner__word-not-found',
        type: 'alert-danger',
        text: 'Sorry, we could not find a page for your search: ',
    },
}


export function BannerRenderer(props) {
    const b = props.name
    return (
        <div
            className={"container-fluid cld-banner alert " +
                bannerDetails[b].type}
            id={bannerDetails[b].id}
        >
            <span id={bannerDetails[b].id + '-content'}>
                <i
                    className={
                        bannerDetails[b].type === 'alert-success' ? (
                            "fa fa-info-circle"
                        ) : (
                            "fa fa-exclamation-triangle"
                        )
                    }
                    aria-hidden="true"
                ></i>
                {bannerDetails[b].text + props.text}
            </span>
            <button
                type="button"
                className="close cld-banner__button-close"
                aria-label="Close"
                onClick={function () {
                    let hide = props.hideFunction(b)
                    hide()
                }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}


export class CldBanner extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            connectionError: {
                isShown: false,
                additionalText: '',
            },
            feedbackSuccess: {
                isShown: false,
                additionalText: '',
            },
            sendError: {
                isShown: false,
                additionalText: '',
            },
            subscriptionSuccess: {
                isShown: false,
                additionalText: '',
            },
            wordNotFound: {
                isShown: false,
                additionalText: '',
            },
        }
        this.hideBanner = this.hideBanner.bind(this)
        this.showBanner = this.showBanner.bind(this)
        this.removeBannerOnSuccess = this.removeBannerOnSuccess.bind(this)
    }

    showBanner(event) {
        let text = ('detail' in event ? event.detail.text : '')
        let banner = event.type
        let bannerState = {}
        bannerState[banner] = {
            isShown: true,
            additionalText: text,
        }
        this.setState(bannerState)
    }

    hideBanner(bannerType) {
        let hide = function () {
            let bannerState = {}
            bannerState[bannerType] = {
                isShown: false,
                additionalText: '',
            }
            this.setState(bannerState)
        }.bind(this)
        return hide
    }

    removeBannerOnSuccess(bannerType) {
        let bannerState = {}
        bannerState[bannerType] = {
            isShown: false,
            additionalText: '',
        }
        this.setState(bannerState)
    }

    componentDidMount() {
        for (let banner in bannerDetails) {
            window.addEventListener(banner, this.showBanner)
        }
        window.addEventListener(
            'removeBanner',
            function (e) {
                this.removeBannerOnSuccess(e.detail.banner)
            }.bind(this)
        )
    }


    render() {
        let banners = []
        for (let banner in this.state) {
            if (this.state[banner].isShown) {
                banners.push(
                    <BannerRenderer
                        key={banner}
                        name={banner}
                        text={this.state[banner].additionalText}
                        hideFunction={this.hideBanner}
                    />
                )
            }
        }

        return (
            <div className="container-fluid" id="cld-banner__container">
                {banners}
            </div>
        )
    }
}
