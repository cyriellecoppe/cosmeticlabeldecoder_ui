import React from 'react'


function DesignToolsRenderer(props) {
    return (
        <div>
            <dt>{props.title}</dt>
            <dd><ul>
                {props.tools.map((tool, index) =>
                    <li key={index}>{tool.name}</li>
                )}
            </ul></dd>
        </div>
    )
}


export default function WebsiteDesign(props) {
    return (
        <div className="col-md-12" id="design">
            <h1>Making-of</h1>
            <div className="row justify-content-center">
                <dl className="col-md-6 sm-col-6">
                    <h4>Front-end</h4>
                    <DesignToolsRenderer
                        title='Design'
                        tools={[
                            {name: 'HTML5'},
                            {name: 'CSS3'},
                            {name: 'Bootstrap v4'},
                            {name: 'SASS v4'},
                        ]}
                    />
                    <DesignToolsRenderer
                        title='JavaScript libraries'
                        tools={[
                            {name: 'React v16'},
                            {name: 'React Router v4'},
                            {name: 'jQuery v3'},
                        ]}
                    />
                    <DesignToolsRenderer
                        title='Packaging'
                        tools={[
                            {name: 'Webpack v4'},
                            {name: 'npm v6'},
                            {name: 'Babel v7'},
                        ]}
                    />
                </dl>
                <dl className="col-md-6 sm-col-6">
                    <h4>Back-end</h4>
                    <DesignToolsRenderer
                        title='Web Framework'
                        tools={[
                            {name: 'Django v2'},
                            {name: 'Django REST Framework v3'},
                        ]}
                    />
                    <DesignToolsRenderer
                        title='Database'
                        tools={[
                            {name: 'PostgreSQL v10'},
                        ]}
                    />
                </dl>
            </div>
        </div>
    )
}
