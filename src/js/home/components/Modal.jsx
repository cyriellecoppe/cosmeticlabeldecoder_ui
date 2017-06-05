import React from 'react'

import { Link } from 'react-router-dom'


export default class ModalContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
        }
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    hideModal() {
        this.setState({isModalVisible: false})
    }

    showModal() {
        this.setState({isModalVisible: true})
    }

    componentDidMount() {
        // On non-demo websites: use a cookies reader/writer framework
        let cookies = document.cookie
        if (!cookies.includes('hasSeenModal=true')) {
            this.showModal()
            document.cookie = 'hasSeenModal=true'
        }
    }

    render() {
        if (this.state.isModalVisible === false) return null
        return (
            <div className="modal" role="dialog" id="welcome-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">
                                Hi! Welcome to CLD
                            </div>
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={this.hideModal}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-left">
                            <div className="modal-body__section">
                                <p>
                                    {'"Cosmetic Label Decoder"'} helps you <b>understand</b> your cosmetics at a glance, providing an overview of their <b>composition</b>. Based on the {'"International Nomenclature of Cosmetics Ingredients"'}, CLD assesses each ingredient composing a product and <b>rates</b> its value and environmental impact.
                                </p>
                            </div>
                            <div className="modal-body__section">
                                <h5>Why?</h5>
                                <p>This sandbox website is an on-going side-project, helping me try out some <b>responsive design</b> principles, <b>modern UI</b> concepts and tools.</p>
                            </div>
                            <div className="modal-body__section">
                                <h5>Making-of</h5>
                                <p>This <b>Single-Page-Application</b> is built using <b>React</b> and <b>React Router</b> and designed with <b>Bootstrap</b> (see <Link to="/about#design">full list</Link>).
                                </p>
                                <p>
                                    All data you will find are dummy content.
                                </p>
                            </div>
                            <div className="modal-body__section">
                                <h5>Try me</h5>
                                <ul>
                                    <li>Type an ingredient or product name on the <b>CLD search bar</b> (<em>{'"aqua"'}</em>, <em>{'"lip balm"'}</em>...).</li>
                                    <li>Want to see more? Take a look at the <b><Link to="/database">database</Link></b>.</li>
                                    <li>Subscribe to the newsletter or send me a <b><Link to="/contact#feedback">feedback</Link></b>.</li>
                                </ul>
                            </div>
                            <div className="text-muted text-right">
                                Check the <a href="https://github.com/cyriellecoppe/cosmeticlabeldecoder_ui">source code</a> on GitHub. <i className="fa fa-github" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn"
                                onClick={this.hideModal}
                            >
                                Ok, I am ready!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
