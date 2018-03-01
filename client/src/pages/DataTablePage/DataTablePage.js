import React, {Component} from 'react';
import Table from '../../components/Table/Table';
import TableRow from '../../components/Table/TableRow';
import TableHeader from '../../components/Table/TableHeader';
import {Container} from '../../components/Grid';

class DataTablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  };

  render() {
    return (<div className="container padding-2">
      <div className="row">

        <div id="table-datatables">
          <h4 className="header">Transactions</h4>
          <div className="row">
            <div className="col s12">
              <p>Sample transactions.</p>
            </div>
            <div className="col s12">
              <Table/>
            </div>
          </div>
        </div>
      </div>
    </div>);
  };
};

export default DataTablePage;
