import React from 'react'
import { Link } from 'react-router-dom'


export default function BlogChoice() {
    return (
        <div className="row justify-content-center">
            <Link
                to="/blog/articles"
                className="col-md-5 col-sm-10 choice-list-type"
                id="blog__choice__articles"
            >
                Read articles
            </Link>
            <Link
                to="/blog/news"
                className="col-md-5 col-sm-10 choice-list-type"
                id="blog__choice__news"
            >
                Read news
            </Link>
        </div>
    )
}
