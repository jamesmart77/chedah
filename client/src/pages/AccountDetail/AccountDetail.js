import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Panel from "../../components/Panel";
import MaterialButton from "../../components/MaterialButton";
import API from "../../utils/API";

class AccountDetail extends Component {
  state = {
    account: {
      name: "Chase",
      nickName: "Credit Card",
      balance: 32.26,
      availableCredit: 58897.26,
      apr: .75,
      fees: 0

    },
    transactions: []
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getTransactionsByAccount()
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => this.setState({ transactions: res }))
      .catch(err => console.log(err));
  }

  renderTr(tr){ 
    return <tr key={tr.id}>
      <td>{tr.date}</td>
      <td>{tr.vendor}</td>
      <td>{tr.category}</td>
      <td>{tr.gig}</td>
      <td>{tr.ammount}</td>
    </tr>
  };

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
      
      
      <div style={{clear: 'both'}} className="row">
        <div className="col s3">
          <Panel title="BALANCE" value="$32.26" css="success"/>
        </div>
        <div className="col s3">
          <Panel title="AVAILABLE CREDIT" value="$58897.26"/>
        </div>
        <div className="col s3">
          <Panel title="APR" value="0.75" css="fail"/>
        </div>
        <div className="col s3">
          <Panel title="FEES" value="$32.26"/>
        </div>
      </div>
      <table className="striped">
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
        {this.state.transactions.map(this.renderTr)}
      </tbody>
      </table>
      </Container>
    );
  }
}

export default AccountDetail;
