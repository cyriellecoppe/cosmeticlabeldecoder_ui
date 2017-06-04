import React from 'react'

import ArticlesContainer from './components/Articles.jsx'
import Modal from './components/Modal.jsx'
import NewsContainer from './components/News.jsx'
import { SearchBarContainer } from './components/SearchBar.jsx'


export default function Home() {
    return (
        <div>
            <SearchBarContainer />
            <ArticlesContainer />
            <NewsContainer />
            <Modal />
        </div>
    )
}
