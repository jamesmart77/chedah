import React, { Component } from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';



const $ = require('jquery');
$.DataTable = require('datatables.net');


// sample data
const defaultHeaders = ['Date', 'Vendor', 'Category', 'Gig', 'Amount'];
const defaultTransactions = [
    {date:'2018-02-28T13:21-0500', vendor:'Starbucks', category: 'Food', gig: 'Uber', amount:'4.21'},
    {date:'2018-02-27T16:02-0500', vendor:'Mobil', category: 'Gas', gig: 'Uber', amount:'37.81'},
    {date:'2018-02-27T15:02-0500', vendor:'Amazon', category: 'Books', gig: 'Programming', amount:'71.47'},
    {date:'2018-02-27T11:18-0500', vendor:'Autozone', category: 'Parts', gig: 'Uber', amount:'411.47'},
    {date:'2018-02-27T09:02-0500', vendor:'Moxi', category: 'Food & Drink', gig: 'Uber', amount:'148.71'},
    {date:'2018-02-26T17:21-0500', vendor:'Starbucks', category: 'Food', gig: 'Programming', amount:'4.98'},
    {date:'2018-02-26T16:04-0500', vendor:'Exxon', category: 'Gas', gig: 'Uber', amount:'41.13'},
    {date:'2018-02-26T11:02-0500', vendor:'Barnes & Noble', category: 'Books', gig: 'Programming', amount:'93.73'},
    {date:'2018-02-26T10:18-0500', vendor:'Autozone', category: 'Parts', gig: 'Uber', amount:'411.47'},
    {date:'2018-02-26T09:02-0500', vendor:'Portsmouth Gaslight', category: 'Food & Drink', gig: 'Programming', amount:'218.68'}
];


// data table component
class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
        tableId: 'data-table-transactions',
        headers: props.headers || defaultHeaders,
        transactions: props.transactions || defaultTransactions
    };
  };

  componentDidMount() {
      $(`#${this.state.tableId}`).DataTable();
  };

  render() {
    return (
            <table id={this.state.tableId} className="responsive-table display" cellSpacing="0">
            <TableHeader
                headers={this.state.headers}
            />

            {this.state.transactions.map((trn, idx) => (
                <TableRow
                    key={idx}
                    date={trn.date}
                    vendor={trn.vendor}
                    category={trn.category}
                    gig={trn.gig}
                    amount={trn.amount}
                />
            ))}
        </table>
    );
  }
}


export default Table;
