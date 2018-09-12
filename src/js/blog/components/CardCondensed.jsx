import React from 'react'
import { Link } from 'react-router-dom'


export default function CardCondensed(props) {
    const card = props.card
    let image
    if (card.hasOwnProperty('images') &&
        card.images.length !== 0) {
        image = (
            <img
                className="card-img-top"
                alt={card.images[0].title}
                src={card.images[0].image}
            />
        )
    }
    return (
        <div className="card">
            {image !== undefined ? image : ''}
            <div className="card-block blog__card">
                <h4 className="card-title">{card.title}</h4>
                <p className="card-category">
                    {card.hasOwnProperty('category') ? card.category : ''}
                </p>
                <p className="card-subtitle text-muted">{card.summary}</p>
                <p className="card-text">{card.description}</p>
            </div>
            <div className="card-footer">
                <small className="card-date text-muted">{card.date}</small>
                <Link
                    to={'/blog/' + props.blogContentType + '/' + card.id}
                    className="btn btn-sm cld-btn"
                >
                    Read more
                </Link>
            </div>
        </div>
    )
}
