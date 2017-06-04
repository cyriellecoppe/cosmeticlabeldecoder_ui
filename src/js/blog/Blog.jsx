import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import BlogChoice from './components/BlogChoice.jsx'
import Breadcrumbs from '../shared/Breadcrumbs.jsx'
import CardDetailed from './components/CardDetailed.jsx'
import CardsContainer from './components/CardsContainer.jsx'
import NotFound from '../shared/NotFound.jsx'


export default function Blog(props) {
    return (
        <div>
            <div className="container-fluid" id="sub-menu__blog">
                <Link to="/blog" aria-label="Go to blog page">Blog</Link>
            </div>
            <Route component={Breadcrumbs} />
            <div className="container sub-menu__sub-container">
            <Switch>
                <Route
                    exact path='/blog'
                    component={BlogChoice}
                />
                <Route
                    exact path='/blog/:type/:id'
                    component={CardDetailed}
                />
                <Route
                    exact path='/blog/:type/:id'
                    component={CardDetailed}
                />
                <Route
                    exact path='/blog/:type'
                    component={CardsContainer}
                />
                <Route
                    component={NotFound}
                />
            </Switch>
            </div>
        </div>
    )
}
