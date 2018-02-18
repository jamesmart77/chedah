import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class AccountDetail extends Component {
  state = {
    account: {},
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

  render() {
    return (
      <Container fluid>
          <div>{this.state.transactions.map(transaction => <pre>transaction</pre>)}</div>
      </Container>
    );
  }
}

export default AccountDetail;
