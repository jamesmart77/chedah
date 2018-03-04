import React, { Component } from 'react';
import { Col, Row, Container } from '../../components/Grid';
import { Account } from '../../components/Accounts';
import Moment from 'react-moment';
import API from '../../utils/API';
import { DataTable } from '../../components/DataTable';
import { formatCurrencyValueJSX } from '../../utils/currency';


// calculates the next due date of a credit card
function nextDueDate(day) {
    const dueDate = new Date();
    const diff = day - dueDate.getDate();
    if (diff < 1) {
        dueDate.setMonth(dueDate.getMonth() + 1)
    }
    dueDate.setDate(day);
    return dueDate;
}


// Account detail page
class AccountDetail extends Component {


    state = {
        accountId: this.props.match.params.id,
        transactions: []
    };

    // callback to backend
    updateDefaultGig(itemId, gigId) {

    }

    // load account details from the id, then get transactions
    // TODO: get the account details from the transaction payload
    componentDidMount() {
        API.getAccountDetails(this.state.accountId).then(accdata => {
            console.log(accdata);
            return accdata;
        }).then(accdata => {
            this.setState(accdata)
            API.getTransactionsByAccount().then(transdata => {
                console.log(transdata);
                return transdata;
            }).then(transdata => {
                this.setState({transactions: transdata})
            })
            .catch(err => console.log(err));
        })
    }

    renderCreditTable() {
        const avail = (this.state.limit - this.state.balance);
        return (
            <table className="account-balances">
                <tbody>
                    <tr className="account-balance">
                        <td className="description">Balance:</td>
                        <td>{formatCurrencyValueJSX(this.state.balance)}</td>
                        <td className="stats"><span className="new badge" data-badge-caption="% APR">{this.state.apr}</span></td>
                    </tr>

                    <tr className="account-avail">
                        <td className="description">Available:</td>
                        <td>{formatCurrencyValueJSX(avail)}</td>
                        <td></td>
                    </tr>
                    <tr className="account-limit">
                        <td className="description">Limit:</td>
                        <td>{formatCurrencyValueJSX(this.state.limit)}</td>
                        <td></td>
                    </tr>
                    <tr className="account-fees">
                        <td className="description">Fees:</td>
                        <td>{formatCurrencyValueJSX(this.state.fees)}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        )
    }

    renderCheckingTable() {
        return (
            <table className="account-balances">
                <tbody>
                    <tr className="account-balance">
                        <td className="description">Balance:</td>
                        <td>{formatCurrencyValueJSX(this.state.balance)}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {
        console.log(`-> AccountDetail:`);
        console.log(this.state);
        let accountDetails;
        let dueDate;
        if (this.state.accountType === 'credit') {
            accountDetails = this.renderCreditTable()
            dueDate = <h6 className="account-due"><span className='date-due'>Due: {<Moment format="MMMM DD, YYYY">{nextDueDate(this.state.dueDate).toDateString()}</Moment>}</span></h6>
        } else {
            accountDetails = this.renderCheckingTable()
        }
        return (
            <div className="container fluid">
                <div className="card-panel account-detail">
                    <div className="row valign-wrapper s12">
                        <div className="col l7">
                            <h4><i className="material-icons">credit_card</i><span className="account-header"> {this.state.name}</span></h4>
                            <h5 className="account-number"> {this.state.accountNum}</h5>
                            {dueDate}
                        </div>
                        <div className="col l5">
                            {accountDetails}
                        </div>
                    </div>
                    <br/>
                    <div className="divider"></div>
                    <br/>
                    <div className="row account-transations">
                        <DataTable/>
                    </div>
                </div>
            </div>
        );
    }
}


export default AccountDetail;
