import React from 'react'


export default function Iframe(props) {
    let height
    let width
    if (props === undefined) {
        height = '100%'
        width = '100%'
    } else {
        height = (props.height === undefined ? '100%' : props.height)
        width = (props.width === undefined ? '100%' : props.width)
    }
    return React.createElement(
        "iframe",
        {
            frameBorder: "0",
            src: props.url,
            alt: props.iframeTitle,
            allowFullScreen: 'allowfullscreen',
            style: {
                height: height,
                width: width,
                border: 0,
                frameborder: 0,
            },
        }
    )
}
