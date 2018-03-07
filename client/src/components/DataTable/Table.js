import React, { Component } from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import './DataTable.css';


const $ = require('jquery');
$.DataTable = require('datatables.net');
// window.jQuery = $;



function buildTable(named, transactions) {
    let table = $(named).DataTable( {
        select: true,
        data: transactions,
    });
}

// data table component
class Table extends Component {

  constructor(props) {
    super(props);
    console.log(`  -> Table: `, props);
    this.state = {
        tableId: 'data-table-transactions'
    };
  };

  reloadTableData(rows) {
    this.dataTable.clear();
    this.dataTable.rows.add(rows);
  }

  componentWillUnmount(){
     this.dataTable.destroy(true);
  }

  componentDidUpdate() {
      // this.dataTable.draw();
  }

  // pass row update information to the view
  rowEdited(data) {
      this.props.transactionsUpdated(data);
      // this.dataTable.clear();
  }

  render() {
      if (this.props.transactions.length > 0) {
          return (
              <table
                  // ref={(table) => { this.dataTable = $(table).DataTable()}}
                  id={this.state.tableId}
                  className='display highlight datatable'
                  cellSpacing='0' role='grid'>

                  {/* Headers */}
                  <TableHeader headers={this.props.headers} />

                  {/* Body */}
                  <tbody>
                      {this.props.transactions.map((t,i) =>
                          <TableRow row={i} rowEdited={this.rowEdited.bind(this)} key={t._id} {...t} />
                      )}
                  </tbody>

              </table>
          )
      }
      // don't render a table until we have transactions
      return (
          <div></div>
      )

  }
}


export default Table;
