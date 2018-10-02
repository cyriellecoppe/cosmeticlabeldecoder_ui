import React from 'react'
import { Link } from 'react-router-dom'


export default function Breadcrumbs(props) {

    let pathname = props.location.pathname
    let breadcrumbs = pathname.split('/').slice(1)

    let navigation = {
        database: {
            title: 'Database',
            link: '/database',
        },
        products: {
            title: 'All products',
            link: '/database/products',
        },
        ingredients: {
            title: 'All ingredients',
            link: '/database/ingredients',
        },
        detailed: {
            title: 'Details',
            // Already on the right page
            link: '#',
        },
        blog: {
            title: 'Blog',
            link: '/blog',
        },
        articles: {
            title: 'Articles',
            link: '/blog/articles',
        },
        news: {
            title: 'News',
            link: '/blog/news',
        },
    }

    return (
        <div className="container-fluid cld-breadcrumbs">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/" className="cld-breadcrumbs__item">
                        <span className="cld-breadcrumbs__item-title">
                            Home
                        </span>
                    </Link>
                    {breadcrumbs.map(function (element) {
                        if (/^[0-9]+$/.test(element)) {
                            return (
                                <Link
                                    to={navigation.detailed.link}
                                    key={element}
                                    className="cld-breadcrumbs__item"
                                >
                                    <span className="cld-breadcrumbs__item-title">
                                        {navigation.detailed.title}
                                    </span>
                                </Link>
                            )
                        } else if (navigation[element] !== undefined) {
                            return (
                                <Link
                                    to={navigation[element].link}
                                    key={element}
                                    className="cld-breadcrumbs__item"
                                >
                                    <span className="cld-breadcrumbs__item-title">
                                        {navigation[element].title}
                                    </span>
                                </Link>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
