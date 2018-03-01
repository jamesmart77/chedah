import React, { Component } from 'react';



class TableHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortBy: null,
            headers: props.headers || []
        };

        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(sortBy) {
        console.log(`clicking row: ${this.refs}`);
        this.setState({sortBy: sortBy})
    };

    render() {
        return(
            <thead>
                <tr>
                    {this.state.headers.map((item, idx) => (
                        <th key={idx}>{item}</th>
                    ))}
                </tr>
            </thead>
        );
    };
};


export default TableHeader;
