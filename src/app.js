'use strict'

import 'bootstrap/dist/css/bootstrap.css'
import './css/main.scss'
import 'bootstrap'

import React from 'react'
import ReactDOM from 'react-dom'

import Router from './js/Router.jsx'
import { configEvents } from './configEvents.js'


configEvents()

ReactDOM.render(<Router />, document.getElementById('app'))
