import React from 'react'
import { Link } from 'react-router-dom'


export default function DatabaseChoice(props) {
    return (
        <div className="row justify-content-center">
            <Link
                to="/database/products"
                className="col-md-5 col-sm-10 choice-list-type"
                id="database__choice__products"
            >
                See all products
            </Link>
            <Link
                to="/database/ingredients"
                className="col-md-5 col-sm-10 choice-list-type"
                id="database__choice__ingredients"
            >
                See all ingredients
            </Link>
        </div>
    )
}
