import React, { Component } from 'react';
import Moment from 'react-moment';
import RowColumn from './RowColumn';


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
        console.log(`vendor: ${this.state.vendor}`);
        this.setState({category: category})
    };

    render() {
        return(
            <tr role='row'>
                <RowColumn value={this.state.date} role='date'/>
                <RowColumn value={this.state.vendor} editable='true'/>
                <RowColumn value={this.state.category} editable='true'/>
                <RowColumn value={this.state.gig} role='gig' editable='true'/>
                <RowColumn value={this.state.amount}/>
            </tr>
        );
    };
};


export default TableRow;
