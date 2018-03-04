import React, { Component } from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import './DataTable.css';


const $ = require('jquery');
$.DataTable = require('datatables.net');


// sample data
const defaultHeaders = ['Date', 'Vendor', 'Category', 'Gig', 'Amount'];
/*
const defaultHeaders = [
    {property: 'date', header: 'Date', editable: false},
    {property: 'vendor', header: 'Vendor', editable: false},
    {property: 'category', header: 'Category', editable: false},
    {property: 'gig', header: 'Gig', editable: false},
    {property: 'amount', header: 'Amount', editable: true}
]
*/

const defaultTransactions = [
    {date:'2018-02-28T13:21-0500', vendor:'Starbucks', category: 'Food', gig: 'Uber', amount:'-4.21'},
    {date:'2018-02-27T16:02-0500', vendor:'Mobil', category: 'Gas', gig: 'Uber', amount:'-37.81'},
    {date:'2018-02-27T15:02-0500', vendor:'Amazon', category: 'Books', gig: 'Programming', amount:'-71.47'},
    {date:'2018-02-27T11:18-0500', vendor:'Autozone', category: 'Parts', gig: 'Uber', amount:'-411.47'},
    {date:'2018-02-27T09:02-0500', vendor:'Moxi', category: 'Food & Drink', gig: 'Uber', amount:'-148.71'},
    {date:'2018-02-26T17:21-0500', vendor:'Starbucks', category: 'Food', gig: 'Programming', amount:'-4.98'},
    {date:'2018-02-26T16:04-0500', vendor:'Exxon', category: 'Gas', gig: 'Uber', amount:'-41.13'},
    {date:'2018-02-26T11:02-0500', vendor:'Barnes & Noble', category: 'Books', gig: 'Programming', amount:'-93.73'},
    {date:'2018-02-26T10:18-0500', vendor:'Autozone', category: 'Parts', gig: 'Uber', amount:'-258.45'},
    {date:'2018-02-26T09:02-0500', vendor:'Portsmouth Gaslight', category: 'Food & Drink', gig: 'Programming', amount:'-218.68'},

    {date:'2018-02-25T14:31-0500', vendor:'Starbucks', category: 'Food', gig: 'Uber', amount:'-4.21'},
    {date:'2018-02-25T11:34-0500', vendor:'Mobil', category: 'Gas', gig: 'Uber', amount:'-37.81'},
    {date:'2018-02-25T10:57-0500', vendor:'Amazon', category: 'Books', gig: 'Programming', amount:'-71.47'},
    {date:'2018-02-25T09:11-0500', vendor:'Autozone', category: 'Parts', gig: 'Uber', amount:'-411.47'},

    {date:'2018-02-25T07:00-0500', vendor:'Payroll', category: 'Income', gig: 'Programming', amount:'4600.00'},

    {date:'2018-02-24T09:02-0500', vendor:'Jumpin\' Jays', category: 'Food & Drink', gig: 'Uber', amount:'-148.71'},
    {date:'2018-02-24T17:21-0500', vendor:'Dunkin Donuts', category: 'Food', gig: 'Programming', amount:'-12.97'},
    {date:'2018-02-24T16:04-0500', vendor:'Shell', category: 'Gas', gig: 'Uber', amount:'-40.02'},
    {date:'2018-02-24T11:02-0500', vendor:'Apple Developer Connection', category: 'Research', gig: 'Programming', amount:'-99.00'},
    {date:'2018-02-24T10:18-0500', vendor:'Two Guys Auto', category: 'Parts', gig: 'Uber', amount:'-198.45'},
    {date:'2018-02-24T09:02-0500', vendor:'Massimo', category: 'Food & Drink', gig: 'Programming', amount:'-356.81'},


    {date:'2018-01-27T09:02-0500', vendor:'Jumpin\' Jays', category: 'Food & Drink', gig: 'Uber', amount:'-148.71'},
    {date:'2018-01-26T17:21-0500', vendor:'Dunkin Donuts', category: 'Food', gig: 'Programming', amount:'-12.97'},
    {date:'2018-01-26T16:04-0500', vendor:'Shell', category: 'Gas', gig: 'Uber', amount:'-40.02'},
    {date:'2018-01-26T11:02-0500', vendor:'Apple Developer Connection', category: 'Research', gig: 'Programming', amount:'-99.00'},
    {date:'2018-01-25T10:18-0500', vendor:'Two Guys Auto', category: 'Parts', gig: 'Uber', amount:'-198.45'},
    {date:'2018-01-25T09:02-0500', vendor:'Massimo', category: 'Food & Drink', gig: 'Programming', amount:'-356.81'},

    {date:'2018-01-25T07:00-0500', vendor:'Payroll', category: 'Income', gig: 'Programming', amount:'4400.00'},



    {date:'2018-01-24T17:21-0500', vendor:'Dunkin Donuts', category: 'Food', gig: 'Uber', amount:'-22.91'},
    {date:'2018-01-24T16:04-0500', vendor:'Shell', category: 'Gas', gig: 'Uber', amount:'-39.72'},
    {date:'2018-01-24T11:02-0500', vendor:'freeCodeCamp Subsciption', category: 'Research', gig: 'Programming', amount:'-211.99'},
    {date:'2018-01-24T10:18-0500', vendor:'Audi Stratham', category: 'Parts', gig: 'Uber', amount:'-2198.45'},
    {date:'2018-01-24T09:02-0500', vendor:'Amazon AWS', category: 'Misc', gig: 'Programming', amount:'-237.19'},
    {date:'2018-01-24T09:02-0500', vendor:'McDonald`\s`', category: 'Food & Drink', gig: 'Uber', amount:'-32.18'}
];


// data table component
class DataTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
        tableId: 'data-table-transactions',
        headers: props.headers || defaultHeaders,
        transactions: props.transactions || defaultTransactions
    };

    console.log(`-> DataTable: `);
    console.log(this.state);
  };

  componentDidMount() {
      $(`#${this.state.tableId}`).DataTable({
          lengthMenu: [ 10, 25, 50 ]}
      );
  };

  render() {
      return (
          <table
              id={this.state.tableId}
              className='display highlight datatable'
              cellSpacing='0' role='grid'>

              <TableHeader
                  headers={this.state.headers}
              />

              <tbody>
                  {this.state.transactions.map((t, i) =>
                      <TableRow key={i} {...t} />
                  )}
              </tbody>
          </table>
      );
  }
}


export default DataTable;
