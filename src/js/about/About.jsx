import React from 'react'
import { Link } from 'react-router-dom'

import RelatedLinks from './components/RelatedLinks.jsx'
import WebsiteDesign from './components/WebsiteDesign.jsx'


export default function About() {
    return (
        <div>
            <div className="container-fluid" id="sub-menu__about">
                <Link to="/about" aria-label="Go to about page">
                    About
                </Link>
            </div>
            <div className="container sub-menu__sub-container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <p>This sandbox website is an on-going side-project, helping me try out some <b>responsive design</b> principles, <b>modern UI</b> concepts and tools.</p>
                    </div>
                    <WebsiteDesign />
                    <RelatedLinks />
                </div>
            </div>
        </div>
    )
}
