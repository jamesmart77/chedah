import React, { Component } from 'react';



class TableHeader extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        return(
            <thead>
                <tr>
                    {this.props.headers.map((item, idx) => (
                        <th key={idx}>{item}</th>
                    ))}
                </tr>
            </thead>
        );
    };
};


export default TableHeader;
