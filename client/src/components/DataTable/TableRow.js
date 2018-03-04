import React, { Component } from 'react';
import Moment from 'react-moment';
import RowColumn from './Cells';


class TableRow extends Component {

    constructor(props) {
        super(props);
        console.log(`-> TableRow: `);
        console.log(props);
    };

    render() {
        const isExpense = this.props.amount < 0;
        const cname = isExpense ? 'row-expense' : 'row-deposit';
        return(
            <tr key={this.props._id} className={cname} role='row'>
                <RowColumn value={this.props.date} name='date' role='date'/>
                <RowColumn value={this.props.vendor} name='vendor' editable='true'/>
                <RowColumn value={this.props.category} name='category' editable='true'/>
                <RowColumn value={this.props.gig} name='gig' role='gig' editable='true'/>
                <RowColumn value={this.props.amount} name='amount' align='right'/>
            </tr>
        );
    };
};


export default TableRow;
