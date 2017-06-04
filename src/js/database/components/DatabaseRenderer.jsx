import React from 'react'
import { Link } from 'react-router-dom'

import { BadgeRenderer } from '../../shared/ScoreContainer.jsx'


function Block(props) {
    const block = props.block
    let property = block.hasOwnProperty('products') ? 'products' : 'ingredients'
    let url = '/database/' + property + '/'
    return (
        <div className="col-md-4">
            <h4 className="database__card-list__title">{block.name}</h4>
            <div>
                {block[property].length === 0 ? (
                    <div className="database__card-list__content text-muted">
                        No results
                    </div>
                ) : (
                    block[property].map((element) => (
                        <Link
                            to={url + element.id}
                            key={element.id}
                            className="database__card-list__content"
                        >
                            <span id="database__card-list__content--name">
                                {element.name.toLowerCase()}
                            </span>
                            <BadgeRenderer
                                title={'CLD score: '}
                                score={Math.round(
                                    element['quality_price_ratio']
                                )}
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}


function Row(props) {
    return (
        <div className="row database__row__card-list">
            {props.row.map(function (block, index) {
                if (block === undefined) {
                    return (
                        <div className="col-md-3" key={'undefined' + index}>
                        </div>
                    )
                } else {
                    return <Block key={block.id} block={block} />
                }
            })}
        </div>
    )
}


export default class DatabaseRenderer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sortedContent: [],
        }
        this.createAlphabet = this.createAlphabet.bind(this)
        this.createTableLayout = this.createTableLayout.bind(this)
        this.formatIngredientsList = this.formatIngredientsList.bind(this)
        this.sortContent = this.sortContent.bind(this)
    }

    createAlphabet() {
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
        alphabet.push('others')
        let alphabetObj = {}
        for (let letter of alphabet) {
            alphabetObj[letter] = []
        }
        return alphabetObj
    }

    formatIngredientsList(list) {
        /*
            Create an array of letter objects, with ingredients starting
            by these letters.
        */
        let alphabetObj = this.createAlphabet()
        list.map(function (ing) {
            let firstLetter = ing.name.charAt(0).toLowerCase()
            /* eslint yoda: "off" */
            if ('a' <= firstLetter && firstLetter <= 'z') {
                alphabetObj[firstLetter].push(ing)
            } else {
                alphabetObj.others.push(ing)
            }
        })
        let sortedList = []
        for (let letter in alphabetObj) {
            sortedList.push({
                id: letter,
                name: letter,
                ingredients: alphabetObj[letter],
            })
        }
        return sortedList
    }

    sortContent(content, sorter) {
        if (sorter === 'a-z') {
            /*
                Need to format content: get an ingredient list sorted by
                ascending order. But this list cannot be rendered directly,
                unlike other JSON responses.
            */
            this.setState({sortedContent: this.formatIngredientsList(content)})
        } else {
            this.setState({sortedContent: content})
        }
    }

    createTableLayout(list) {
        /*
            Create an index layout [A, B, C, D, E, F, G, H]
            becomes
                [A, B, C]
                [D, E, F]
                [G, H]
        */
        let rowsList = []
        let blocksPerRow = 3
        let index = 0
        while (index < list.length) {
            rowsList.push(list.slice(index, index + blocksPerRow))
            index += blocksPerRow
        }
        return rowsList
    }

    componentDidMount() {
        this.sortContent(this.props.content, this.props.sorter)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.sortContent(nextProps.content, nextProps.sorter)
        }
    }

    render() {
        let rowsList = this.createTableLayout(this.state.sortedContent)
        return (
            <div className="col-md-12">
                {rowsList.map((row, index) =>
                    <Row key={index} row={row} />
                )}
            </div>
        )
    }
}
