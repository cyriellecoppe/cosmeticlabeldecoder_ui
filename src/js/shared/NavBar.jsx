import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'


function MenuButton(props) {
    return (
        <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target={"#" + props.menuId}
            aria-controls={props.menuId}
            aria-expanded="false"
            aria-label="toggle navigation"
        >
            <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
        </button>
    )
}


function NavBrand(props) {
    return (
        <Link className="navbar-brand" to="/" aria-label="Logo CLD">
            <i id="cld-logo"></i>
            <span id="cld-brand">Cosmetic Label Decoder</span>
        </Link>
    )
}


function SubMenuRenderer(props) {

    function closeNavBar() {
        $('#' + props.menuId).collapse('hide')
    }

    return (
        <Link
            className="dropdown-item"
            to={props.subMenuElement.url}
            aria-label={"Go to" + props.subMenuElement.title}
            onClick={() => closeNavBar()}
        >
            {props.subMenuElement.title}
        </Link>
    )
}


function Menu(props) {

    function closeNavBar() {
        $('#' + props.menuId).collapse('hide')
    }

    if (props.menuElement.hasOwnProperty('subMenu')) {
        return (
           <div className="nav-item dropdown">
                <Link
                    className="nav-link"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label={"Go to " + props.menuElement.title}
                    to={props.menuElement.url}
                >
                    {props.menuElement.title}
                </Link>
                <div className="dropdown-menu">
                    {props.menuElement.subMenu.map((subMenuElement) =>
                        <SubMenuRenderer
                            key={subMenuElement.title}
                            subMenuElement={subMenuElement}
                            menuId={props.menuId}
                        />
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <Link
                className="nav-link"
                to={props.menuElement.url}
                aria-label={"Go to " + props.menuElement.title}
                onClick={() => closeNavBar()}
            >
                {props.menuElement.title}
            </Link>
        )
    }
}


function MenuListRenderer(props) {
    return (
        <div className="collapse navbar-collapse" id={props.menuId}>
            <div className="nav navbar-nav">
                {props.menuElements.map((menuElement) =>
                    <Menu
                        key={menuElement.title}
                        menuElement={menuElement}
                        menuId={props.menuId}
                    />
                )}
            </div>
        </div>
    )
}


export default class NavBar extends React.Component {

    constructor(props) {
        super(props)
        this.menuId = 'cld-nav-bar__menu-collapsed'
        this.menuElements = [
            {
                'title': 'home',
                'url': '/',
            },
            {
                'title': 'blog',
                'url': '/blog',
                'subMenu': [
                    {
                        'title': 'all articles',
                        'url': '/blog/articles',
                    },
                    {
                        'title': 'all news',
                        'url': '/blog/news',
                    },
                ],
            },
            {
                'title': 'Database',
                'url': '/database',
                'subMenu': [
                    {
                        'title': 'all products',
                        'url': '/database/products',
                    },
                    {
                        'title': 'all ingredients',
                        'url': '/database/ingredients',
                    },
                ],
            },
            {
                'title': 'about',
                'url': '/about',
            },
            {
                'title': 'contact',
                'url': '/contact',
            },
        ]

    }

    render() {
        return (
            <nav
                className="navbar navbar-expand-sm sticky-top"
                role="navigation"
                id="cld-nav-bar"
            >
                <MenuButton menuId={this.menuId} />
                <NavBrand />
                <MenuListRenderer
                    menuElements={this.menuElements}
                    menuId={this.menuId}
                />
            </nav>
        )
    }
}
