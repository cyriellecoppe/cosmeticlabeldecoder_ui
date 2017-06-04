import React from 'react'
import $ from 'jquery'
import { subscribe, sendFeedback } from '../../../configEvents.js'


function FieldRenderer(props) {
    let properties = {
        required: 'required',
        className: 'col-md-10 form-control',
        'aria-label': props.field.label,
        id: props.field.id,
        name: props.field.name,
        placeholder: props.field.placeholder,
        title: props.field.title,
        type: props.field.type,
    }

    if (props.field.hasOwnProperty('pattern')) {
        properties['pattern'] = props.field.pattern
    }
    if (props.field.hasOwnProperty('rows')) {
        properties['rows'] = props.field.rows
    }

    let element = React.createElement(props.field.tag, properties)

    return (
        <div className="row contact__send-feedback-form__field-row">
            <div className="col-md-12 contact__send-feedback-form__error">
                <div
                    className="cld-tooltip__form--required cld-tooltip__feedback alert alert-danger col-md-10 offset-md-2"
                    role="alert"
                    id={props.field.id + '__tooltip'}
                >
                    <i
                        className="fa fa-exclamation-triangle"
                        aria-hidden="true"
                    >
                    </i>
                    {props.field.title}
                </div>
            </div>
            <label className='col-md-2 col-form-label required'>
                {props.field.label}
            </label>
            {element}
        </div>
    )
}


export default class FeedbackForm extends React.Component {

    constructor(props) {
        super(props)
        /*
            Regex allows most characters in form because final validation
            is handled by the server.

            Characters have to be escaped twice: React will first read the string and perform escaping, then render it as the input pattern attribute.
        */
        let textPattern = '^[^~#<>$%*(){}|\\\\\\[\\]]{1,100}$'
        this.formFields = [
            {
                tag: "input",
                label: "First name",
                name: "first_name",
                id: "feedback-first-name",
                type: "text",
                placeholder: "Enter your first name",
                title: "Please only use letters, numbers or - and _",
                pattern: textPattern,
            },
            {
                tag: "input",
                label: "Last name",
                name: "last_name",
                id: "feedback-last-name",
                type: "text",
                placeholder: "Enter your last name",
                title: "Please only use letters, numbers or - and _",
                pattern: textPattern,
            },
            {
                tag: "input",
                label: "Email",
                name: "email",
                id: "feedback-email",
                type: "email",
                placeholder: "name@example.com",
                title: "Please use a valid email address: name@example.com",
            },
            {
                tag: "textarea",
                label: "Comment",
                name: "comment",
                id: "feedback-comment",
                type: "text",
                placeholder: "Enter your message here...",
                title: "Please enter your message here.",
                pattern: ".{1, 800}",
                rows: "5",
            },
        ]
        this.handleFeedback = this.handleFeedback.bind(this)
        this.handleSuccess = this.handleSuccess.bind(this)
        this.hideTooltips = this.hideTooltips.bind(this)
        this.$form = null
    }

    handleFeedback() {
        if (!this.$form.checkValidity()) {
            for (let field of this.formFields) {
                let $field = $('#' + field.id)
                let $fieldTooltip = $('#' + field.id + '__tooltip')
                if (!document.getElementById(field.id).checkValidity()) {
                    $fieldTooltip.fadeIn('fast')
                    $field.addClass('focus--error')
                    $field.focusin(function () {
                        $field.removeClass('focus--error')
                        $fieldTooltip.fadeOut('fast')
                    })
                }
            }
        } else {
            $('#contact__send-feedback__button--submit').prop('disabled', true)
            $('.cld-tooltip__feedback').fadeOut('fast')
            if ($('#feedback-check-subscription').is(':checked')) {
                window.dispatchEvent(new CustomEvent(
                    subscribe,
                    {detail: {
                        email: $('#feedback-email').val(),
                    }}
                ))
            }
            window.dispatchEvent(new CustomEvent(
                sendFeedback,
                {detail: {
                    firstName: $('#feedback-first-name').val(),
                    lastName: $('#feedback-last-name').val(),
                    email: $('#feedback-email').val(),
                    comment: $('#feedback-comment').val(),
                }}
            ))
        }
    }

    handleSuccess() {
        $('#contact__send-feedback__button--submit').prop('disabled', false)
        this.$form.reset()
    }

    hideTooltips() {
        $('.cld-tooltip__feedback').fadeOut('fast')
        for (let field of this.formFields) {
            $('#' + field.id).removeClass('focus--error')
        }
    }

    componentDidMount() {
        window.addEventListener('feedbackSuccess', this.handleSuccess)
        this.$form = document.getElementById('contact__send-feedback-form')
        $('#contact__send-feedback-form').submit(function (e) {
            e.preventDefault()
        })
    }

    componentWillUnmount() {
        this.hideTooltips()
        window.removeEventListener('feedbackSuccess', this.handleSuccess)
    }

    render() {
        return (
            <div className="col-md-12" id="feedback">
                <h1>Send me your feedback</h1>
                <form id="contact__send-feedback-form" className="col-md-12">
                    {this.formFields.map((field) =>
                        <FieldRenderer key={field.label} field={field} />
                    )}
                    <small className="form-text text-muted">
                        Fields with * are required.
                    </small>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="subscription"
                            id="feedback-check-subscription"
                            value="newsletter"
                            label="newsletter"
                        />
                        <span>{`I want to subscribe to the newsletter and get
                            the latest updates and new releases.`}
                        </span>
                    </div>
                    <div className="row justify-content-end">
                        <button
                            className="col-md-2 btn"
                            type="reset"
                            onClick={this.hideTooltips}
                        >
                            Clear
                        </button>
                        <button
                            className="col-md-3 btn cld-btn"
                            id="contact__send-feedback__button--submit"
                            type="button"
                            onClick={this.handleFeedback}
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
