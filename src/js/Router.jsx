import $ from 'jquery'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import About from './about/About.jsx'
import BackToTopButton from './shared/BackToTopButton.jsx'
import { CldBanner } from './shared/CldBanner.jsx'
import Blog from './blog/Blog.jsx'
import Contact from './contact/Contact.jsx'
import Database from './database/Database.jsx'
import Footer from './shared/Footer.jsx'
import Home from './home/Home.jsx'
import NavBar from './shared/NavBar.jsx'
import NotFound from './shared/NotFound.jsx'
import ScrollPositioning from './shared/ScrollPositioning.jsx'


export default class Router extends React.Component {

    componentDidMount() {
        $('#index__animation--loading').css('display', 'none')
        $('#index__animation--text').css('display', 'none')
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <ScrollPositioning>
                        <Route>
                            <div>
                                <Route component={NavBar} />
                                <Route component={CldBanner} />
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route>
                                        <div>
                                            <Switch>
                                                <Route
                                                    exact path='/about'
                                                    component={About}
                                                />
                                                <Route
                                                    path='/database'
                                                    component={Database}
                                                />
                                                <Route
                                                    path='/blog'
                                                    component={Blog}
                                                />
                                                <Route
                                                    exact path='/contact'
                                                    component={Contact}
                                                />
                                                <Route
                                                    component={NotFound}
                                                />
                                            </Switch>
                                        </div>
                                    </Route>
                                </Switch>
                                <Route component={Footer} />
                                <Route component={BackToTopButton} />
                            </div>
                        </Route>
                    </ScrollPositioning>
                </BrowserRouter>
            </div>
        )
    }

}
