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
        this.setState({sortBy: sortBy})
    };

    render() {
        return(
            <thead>
                <tr>
                    {this.state.headers.map((item, idx) => (
                        <th>{item}</th>
                    ))}
                </tr>
            </thead>
        );
    };
};


export default TableHeader;
