import React, {Component} from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import './DataTable.css';

const $ = require('jquery');
$.fn.DataTable = require('datatables.net');
// window.jQuery = $;

function buildTable(named, transactions) {
    let table = $(named).DataTable({select: true, data: transactions});
}

// data table component
class Table extends Component {

    constructor(props) {
        super(props);
        this.hasTable = false
        this.state = {
            tableId: 'data-table-transactions'
        };
    };

    componentDidUpdate() {
        // initialize the table
        if (!this.hasTable) {
            let table = $(this.datatable).DataTable({lengthChange: false});
            this.hasTable = true
        // else invalidate and redraw the rows to reflect changes
        } else {
            let table = $(this.datatable).DataTable();
            table.api().rows().invalidate().draw()
        }
    }

    // pass row update information to the view
    rowEdited(data) {
        // update the props
        this.props.transactionsUpdated(data);
    }

    render() {
        const tableRows = this.props.transactions.map((t, i) =>
                        <TableRow row={i} rowEdited={this.rowEdited.bind(this)} key={t._id} {...t}/>)


        if (this.props.transactions.length > 0) {
            return (<table id={this.state.tableId}
                // ref={(table) => { this.dataTable = $(table).DataTable()}}
                ref={(node) => {
                    this.datatable = node;
                }} className='display highlight datatable' cellSpacing='0' role='grid'>

                <TableHeader headers={this.props.headers}/>

                <tbody>
                    {tableRows}
                </tbody>

            </table>)
        }
        // don't render a table until we have transactions
        return (<div></div>)

    }
}

export default Table;
