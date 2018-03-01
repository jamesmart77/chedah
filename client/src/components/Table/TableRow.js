import React, { Component } from 'react';
import Moment from 'react-moment';


class TableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.date || '2018-02-27T12:59-0500',
            vendor: props.vendor || 'Starbucks',
            category: props.category || 'default',
            gig: props.gig || null,
            amount: props.amount || 10.00
        };

        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(category) {
        this.setState({category: category})
    };

    render() {
        return(
            <tr>
                <td>{this.state.date}</td>
                <td>{this.state.vendor}</td>
                <td>{this.state.category}</td>
                <td>{this.state.gig}</td>
                <td>{this.state.amount}</td>
            </tr>
        );
    };
};


export default TableRow;
