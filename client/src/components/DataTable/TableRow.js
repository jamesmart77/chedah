import React, { Component } from 'react';
import Moment from 'react-moment';
import RowColumn from './Cells';


class TableRow extends Component {

    constructor(props) {
        super(props);
        console.log(`    -> TableRow: `, props);
    };

    columnEdited(data) {
        this.props.rowEdited({role: data.role, value: data.value, id: this.props._id})
    }

    render() {
        const isExpense = this.props.amount < 0;
        const cname = isExpense ? 'row-expense' : 'row-deposit';
        return(
            <tr key={this.props._id} className={cname} role='row'>
                <RowColumn value={this.props.date} role='date'/>
                <RowColumn value={this.props.vendor} role='vendor' editable='true' columnEdited={this.columnEdited.bind(this)}/>
                <RowColumn value={this.props.category} role='category' editable='true' columnEdited={this.columnEdited.bind(this)}/>
                <RowColumn value={this.props.gig} role='gig' align='center' editable='true' columnEdited={this.columnEdited.bind(this)}/>
                <RowColumn value={this.props.amount} role='amount' align='right'/>
            </tr>
        );
    };
};


export default TableRow;
