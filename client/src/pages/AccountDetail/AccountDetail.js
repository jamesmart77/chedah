import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
// import { Col, Row, Container } from "../../components/Grid";
import Panel from "../../components/Panel";
import MaterialButton from "../../components/MaterialButton";
import API from "../../utils/API";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './AccountDetail.css';

class AccountDetail extends Component {
  state = {
    loading: true,
    account: {
      name: "Chase",
      nickName: "Credit Card",
      balance: 32.26,
      availableCredit: 58897.26,
      apr: .75,
      fees: 0

    },
    transactions: [],
    columns: [
      {
        Header: 'Date',
        accessor: 'date' // String-based value accessors!
      }, 
      // {
      //   Header: 'Trans ID',
      //   accessor: 'transaction_id'
      // },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Category',
        accessor: 'category'
      },
      {
        Header: 'Gig',
        accessor: 'gig'
      },
      {
        Header: 'Amount',
        accessor: 'amount'
      }
    ]
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    const data = {};
    data.accountId = this.props.match.url.split('/')[2];
    API.getTransactionsByAccount(data)
      .then(res => {
        console.log(res);
        this.setState({ transactions: res.data, loading: false });
        return res;
      });
    // .then(res => this.setState({ transactions: res }))
    // .catch(err => console.log(err));
    // API.getTransactionsByAccount()
    //   .then(res => {
    //     console.log(res);
    //     return res;
    //   })
    //   .then(res => this.setState({ transactions: res }))
    //   .catch(err => console.log(err));
  }

  // tr(props) {
  //   return <tr key={props.id}>
  //     <td>{props.date}</td>
  //     <td>{props.name}</td>
  //     <td>{props.category}</td>
  //     <td>{props.gig || "n/a"}</td>
  //     <td>{props.amount}</td>
  //   </tr>
  // };



  render() {
    return (
      <Container fluid>
        <div className="row">
          <div className="col s9">
            <h1>{this.state.account.name}</h1>
            <h5>{this.state.account.nickName}</h5>
          </div>
          <div className="col s3"><MaterialButton type="mode_edit">Uber</MaterialButton></div>
        </div>

        <div style={{ clear: 'both' }} className="row">
          <div className="col s3">
            <Panel title="BALANCE" value="$32.26" css="success" />
          </div>
          <div className="col s3">
            <Panel title="AVAILABLE CREDIT" value="$58897.26" />
          </div>
          <div className="col s3">
            <Panel title="APR" value="0.75" css="fail" />
          </div>
          <div className="col s3">
            <Panel title="FEES" value="$32.26" />
          </div>
        </div>
        
        <ReactTable 
          showPageSizeOptions={true}
          showPagination={true}
          showPaginationTop={false}
          showPaginationBottom={true}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          data={this.state.transactions}
          showPageJump={true}
          columns={this.state.columns}
          defaultPageSize={14}
          filterable={true}
          loading={this.state.loading}
          // pages={pages}
          className="-striped -highlight"
          
          
        />
        
        {/* <table className="striped">
          <thead>
            <tr>
              <td>Date</td>
              <td>Vendor</td>
              <td>Category</td>
              <td>Gig</td>
              <td>Ammount</td>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map(this.tr)}
          </tbody>
        </table> */}
      </Container>
    );
  }
}

export default AccountDetail;
