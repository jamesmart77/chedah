import React, {Component} from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import API from '../../utils/API';
import './DataTable.css';

const $ = require('jquery');
$.fn.DataTable = require('datatables.net');
$.fn.dataTable.ext.errMode = 'throw';


// data table component
class Table extends Component {

    constructor(props) {
        super(props);
        this.hasTable = false
        this.state = {
            tableId: 'data-table-transactions',
            categories: [],
            gigs: [],
            options: props.options || {lengthChange: false}
        };
    };

    componentDidMount() {
        API.getUserCategories().then(categories => {
            this.setState({categories: categories.data})
        })
        .catch(err => {
            console.log(`Error getting categories: ${err}`);
        })
    }

    componentDidUpdate() {
        // initialize the table
        if (!this.hasTable) {
            let table = $(this.datatable).DataTable(this.state.options);  //{lengthChange: false}
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
                        <TableRow
                            row={i}
                            rowEdited={this.rowEdited.bind(this)}
                            key={t._id}
                            gigs={this.props.gigs || []}
                            categories={this.state.categories}
                            {...t}
                        />)


        if (this.props.transactions.length > 0) {
            return (<table id={this.state.tableId}
                // ref={(table) => { this.dataTable = $(table).DataTable()}}
                ref={(node) => {this.datatable = node}}
                className='display highlight datatable' cellSpacing='0' role='grid'>

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
