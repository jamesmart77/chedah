import React, { Component } from 'react';
import Moment from 'react-moment';
import RowColumn from './RowColumn';


class TableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            vendor: props.vendor,
            category: props.category,
            gig: props.gig,
            amount: props.amount
        };

        this.columnEdited = this.columnEdited.bind(this);
    };

    columnEdited(key, val) {
        console.log(`updating: "${key}":"${val}"`);
        this.setState({[key]: val})
        console.log(this.state);
    };

    render() {
        return(
            <tr role='row'>
                <RowColumn value={this.state.date} name='date' role='date' edit_callback={this.columnEdited}/>
                <RowColumn value={this.state.vendor} name='vendor' editable='true' edit_callback={this.columnEdited}/>
                <RowColumn value={this.state.category} name='category' editable='true' edit_callback={this.columnEdited}/>
                <RowColumn value={this.state.gig} name='gig' role='gig' editable='true' edit_callback={this.columnEdited}/>
                <RowColumn value={this.state.amount} name='amount' edit_callback={this.columnEdited}/>
            </tr>
        );
    };
};


export default TableRow;
