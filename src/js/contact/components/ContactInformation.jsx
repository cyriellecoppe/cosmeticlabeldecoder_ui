import React from 'react'

import Iframe from './Iframe.jsx'


export default function ContactInformation() {
    return (
        <div className="col-md-12" id="information">
            <h1>Contact</h1>
            <div className="row" id="contact__contact-information">
                <div className="col-md-6 col-sm-12 col-12 contact__contact-information__block">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <span className="contact__title">
                             Phone:
                        </span>
                        <span className="contact__data">
                            012-345-6789
                        </span>
                </div>
                <div className="col-md-6 col-sm-12 col-12 contact__contact-information__block">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        <span className="contact__title">
                            E-mail:
                        </span>
                        <span className="contact__data">
                            cld@franek.fr
                        </span>
                </div>
                <div className="col-md-6 col-sm-12 col-12 contact__contact-information__block">
                        <i className="fa fa-github" aria-hidden="true"></i>
                        <span className="contact__title">
                            CLD project:
                        </span>
                        <a
                            href="https://github.com/cyriellecoppe/cosmeticlabeldecoder_ui"
                            className="contact__data"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub CLD
                            <i
                                className="fa fa-external-link"
                                aria-hidden="true"
                                title="External Link"
                            ></i>
                        </a>
                </div>
                <div className="col-md-6 col-sm-12 col-12 contact__contact-information__block">
                        <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                        <span className="contact__title">
                            LinkedIn:
                        </span>
                        <a
                            href="https://www.linkedin.com/in/cyriellecoppe/"
                            className="contact__data"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Cyrielle Coppe
                            <i
                                className="fa fa-external-link"
                                aria-hidden="true"
                                title="External Link"
                            ></i>
                        </a>
                </div>
                <div className="col-md-12 contact__contact-information--location">
                    <Iframe
                        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17514.55220287686!2d-123.11961161108725!3d49.265903373437986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673dd7804ebe5%3A0x737fc354c82ac787!2sBroadway-City+Hall!5e0!3m2!1sen!2sca!4v1495327005287"
                    />
                </div>
                <div className="col-md-12">
                        <i className="fa fa-map" aria-hidden="true"></i>
                        <span>Vancouver, BC, Canada.</span>
                </div>
            </div>
        </div>
    )
}
