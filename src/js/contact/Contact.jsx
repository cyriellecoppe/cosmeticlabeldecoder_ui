import React from 'react'
import { Link } from 'react-router-dom'

import ContactInformation from './components/ContactInformation.jsx'
import FeedbackForm from './components/FeedbackForm.jsx'


export default function Contact() {
    return (
        <div>
            <div className="container-fluid" id="sub-menu__contact">
                <Link to="/contact" aria-label="Go to contact page">
                    Contact
                </Link>
            </div>
            <div className="container sub-menu__sub-container">
                <div className="row justify-content-center">
                    <ContactInformation />
                    <FeedbackForm />
                </div>
            </div>
        </div>
    )
}
