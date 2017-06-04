import React from 'react'
import { Link } from 'react-router-dom'

export const scoresRef = {
    productCldScore: {
        title: 'Product CLD score',
        description: `Quality/price ratio between its composition and price
            range. Products with natural ingredients and low market price
            have the highest grade.`,
    },
    ingredientCldScore: {
        title: 'Ingredient CLD score',
        description: `Quality/price ratio between its environmental impact and
            production costs. Low costs and natural ingredients have the
            highest grade.`,
    },
    priceScore: {
        title: 'Price ratio',
        icon: 'fa-star',
        1: 'Low price ratio',
        2: 'Good price ratio',
        3: 'Excellent price ratio',
        description: `Ratio between ingredients production costs and product
            market price. Products with high ingredients production costs
            and low market price have the highest grade.`,
    },
    priceRange: {
        title: 'Price range',
        icon: 'fa-usd',
        1: 'Low range product',
        2: 'Mid-range product',
        3: 'Top range product',
        description: 'Current market price.',
    },
    composition: {
        title: 'Composition',
        icon: 'fa-leaf',
        1: 'Mostly chemical ingredients',
        2: 'Some natural ingredients',
        3: 'Mostly natural ingredients',
        description: `Average based on all ingredients environmental score.
            Products with only natural ingredients have the highest grade.`,
    },
    productionCost: {
        title: 'Production costs',
        icon: 'fa-usd',
        1: 'Low production cost',
        2: 'Mid production cost',
        3: 'High production cost',
        description: `Based on manufacturing and transformation costs.`,
    },
    environmental: {
        title: 'Environmental score',
        icon: 'fa-leaf',
        1: 'Non-natural ingredient',
        2: 'Can be from natural origin',
        3: 'Natural ingredient',
        description: `Based on its production environmental impact and
            biodegradation ability. Natural ingredients have the highest
            grade.`,
    },
}


function ScoreIcon(props) {
    return (
        <i
            className={"fa " + props.iconType + " score-" + props.isActive}
            aria-hidden="true"
        ></i>
    )
}


export function ScoreContainer(props) {

    let score = Math.round(props.score)
    let activeIcon = Array(3).fill(false)

    let i = 0
    while (i < score) {
        activeIcon[i] = true
        i++
    }

    return (
        <div className="scores">
            <Link
                data-toggle="collapse"
                data-target={"#score-description__" + props.type}
                to={"#score-description__" + props.type}
                aria-expanded="false"
                aria-controls={"score-description__" + props.type}
            >
                {scoresRef[props.type].title.length !== 0 ? (
                    <span className="text-muted score-title">
                        {scoresRef[props.type].title}
                    </span>
                ) : ''}
                <span
                    id={props.type}
                    className="text-muted"
                    title={scoresRef[props.type][score]}
                >
                    {activeIcon.map((isActive, index) =>
                        <ScoreIcon
                            key={index}
                            iconType={scoresRef[props.type].icon}
                            isActive={isActive}
                        />
                    )}
                </span>
            </Link>
            <div id={"score-description__" + props.type} className="collapse">
                <div className="card card-block text-muted score-description">
                    <b>{scoresRef[props.type][score]}</b>
                    {scoresRef[props.type].description}
                </div>
            </div>
        </div>
    )
}


export function BadgeRenderer(props) {
    if (props.score <= 0) return null // Initial render score = null
    else if (props.score <= 1) {
        return (
            <span
                className="badge"
                title={props.title + props.score.toString() + "/3"}
            >
                <i className="fa fa-lg fa-frown-o" aria-hidden="true"></i>
            </span>
        )
    } else if (props.score <= 2) {
        return (
            <span
                className="badge"
                title={props.title + props.score.toString() + "/3"}
            >
                <i className="fa fa-lg fa-smile-o" aria-hidden="true"></i>
            </span>
        )
    } else if (props.score <= 3) {
        return (
            <span
                className="badge"
                title={props.title + props.score.toString() + "/3"}
            >
                <i className="fa fa-lg fa-smile-o" aria-hidden="true"></i>
                <i className="fa fa-lg fa-smile-o" aria-hidden="true"></i>
            </span>
        )
    }
}

export function ScoreInformation(props) {

    let fullDescription = []
    for (let s in scoresRef) {
        fullDescription.push({
            title: scoresRef[s].title,
            description: scoresRef[s].description,
        })
    }

    return (
        <div id="database__score-information__container">
            <Link
                id="database__score-information__dropdown-title"
                data-toggle="collapse"
                data-target="#score-information__description"
                to="#score-information__description"
                aria-expanded="false"
                aria-controls="score-information__description"
            >
                Scores information
            </Link>
            <div className="collapse" id="score-information__description">
                <div className="card card-block">
                    {fullDescription.map((score, index) =>
                        <div key={index} className="content">
                            <b>{score.title}</b>
                            <div>{score.description}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
