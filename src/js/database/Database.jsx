import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import Breadcrumbs from '../shared/Breadcrumbs.jsx'
import DetailedIngredient from './components/DetailedIngredient.jsx'
import DetailedProduct from './components/DetailedProduct.jsx'
import DatabaseChoice from './components/DatabaseChoice.jsx'
import DatabaseContainer from './components/DatabaseContainer.jsx'
import NotFound from '../shared/NotFound.jsx'


export default function Database() {
    return (
        <div>
            <div className="container-fluid" id="sub-menu__database">
                <Link to="/database" aria-label="Go to lists page">
                    Database
                </Link>
            </div>
            <Route component={Breadcrumbs} />
            <div className="container  sub-menu__sub-container">
                <Switch>
                    <Route
                        exact path='/database'
                        component={DatabaseChoice}
                    />
                    <Route
                        exact path='/database/ingredients/:id'
                        component={DetailedIngredient}
                    />
                    <Route
                        exact path='/database/products/:id'
                        component={DetailedProduct}
                    />
                    <Route
                        exact path='/database/:type'
                        component={DatabaseContainer}
                    />
                    <Route
                        component={NotFound}
                    />
                </Switch>
            </div>
        </div>
    )
}
