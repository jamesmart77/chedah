import React, { Component } from 'react'
import Moment from 'react-moment'
import Cell from './Cells'

class TableRow extends Component {
  // callback for cells that are edtited
  // data = {value: String, role: String}
  constructor (props) {
    super(props)
    // console.log(`table props: `, props );
  };

  columnEdited (data) {
    this.props.rowEdited({role: data.role, value: data.value, id: this.props._id, location: data.location})
  }

  render () {
    const isExpense = this.props.amount < 0
    const cname = isExpense ? 'row-expense' : 'row-deposit'
    return (
      <tr key={this.props._id} className={cname} role='row'>
        <Cell gigs={this.props.gigs} id={this.props.transaction_id} row={this.props.row} column={0} value={this.props.date} role='date' />
        <Cell gigs={this.props.gigs} id={this.props.transaction_id} row={this.props.row} column={1} value={this.props.transactionName} role='vendor' editable='true' columnEdited={this.columnEdited.bind(this)} />
        <Cell gigs={this.props.gigs} id={this.props.transaction_id} row={this.props.row} column={2} value={this.props.category} autocomplete={this.props.categories} role='category' editable='true' columnEdited={this.columnEdited.bind(this)} />
        <Cell gigs={this.props.gigs} id={this.props.transaction_id} row={this.props.row} column={3} value={this.props.gigId} role='gig' autocomplete={this.props.gigs} align='center' editable='true' columnEdited={this.columnEdited.bind(this)} />
        <Cell gigs={this.props.gigs} id={this.props.transaction_id} row={this.props.row} column={4} value={this.props.amount} role='amount' align='right' />
      </tr>
    )
  };
};

export default TableRow

// $('#vvEqywKJBjFn75Xp3eAWFQqLdZmx9dsN1rNVDz-173-2')
