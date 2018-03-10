import React, {Component} from 'react';
// import {Account, GigMenu} from '../../components/Accounts';
import Moment from 'react-moment';
import API from '../../utils/API';
import {Table} from '../../components/DataTable';
import {formatCurrencyValueJSX} from '../../utils/currency';
import axios from 'axios';


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

const defaultHeaders = [
    {
        name: 'Date',
        align: 'left'
    }, {
        name: 'Vendor',
        align: 'left'
    }, {
        name: 'Category',
        align: 'left'
    }, {
        name: 'Gig',
        align: 'center'
    }, {
        name: 'Amount',
        align: 'right'
    }
]

// Account detail page
//  account_id:"wZJ3ag1rRos6QKpVdnPMIrL4v6EBNnCkkKl5n8"
//  balances:{available: 100, current: 110, limit: null}
//  defaultGigId:"5aa20e3b83461770c7dff9fb"
//  mask:"0000"
//  name:"Plaid Checking"
//  official_name:"Plaid Gold Standard 0% Interest Checking"
//  subtype:"checking"
//  transactions:[]

class AccountDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account_id: this.props.match.params.id,
            transactions: []
        }

        console.log(`Account props: `, props);
    }


    componentDidMount() {
        console.log(`querying account: `, this.state.account_id);
        API.getAccount({accountId: this.state.account_id})
        .then(acct => {
            console.log(`account data: `, acct.data);
            this.setState(acct.data)
        })
        .catch(err => {
            console.log(`Error: `, err);
        })
    }

    //
    gigSelected(gigId, gigName) {
        if (this.state.gigName === gigName) {
            return
        }

        this.setState({gigName: gigName})
        console.log(`-> gig updated: "${gigName}":`, gigId);
        this.updateDefaultGig(this.state.accountId, gigId)
    }

    // callback to backend
    updateDefaultGig(itemId, gigId) {
        axios.post('/accounts', itemId).then((gigData) => {
            console.log(gigData)
        }).catch((err) => {
            console.log(err)
        });
    }

    // add transactions to table
    addTransactions(transactions) {
        let rows = [];
        transactions.forEach(trans => {
            this.state.user.gigs.forEach(gig => {
                if (trans.gigId === gig._id) {
                    trans.gig = gig.name
                }
            })
            rows.push(trans)
        })

        this.setState({transactions: rows})
    }

    // update a transaction
    transactionsUpdated(data) {
        let transdata = [];
        this.state.transactions.forEach(t => {
            if (t._id === data.id) {
                t[data.role] = data.value;
            }
            transdata.push(t)
        })

        this.setState({transactions: transdata})
    }

    renderCreditTable() {
        const avail = (this.state.balances.limit - this.state.balances.current);
        return (<table className="account-balances">
            <tbody>
                <tr className="account-balance">
                    <td className="description">Balance:</td>
                    <td>{formatCurrencyValueJSX(this.state.balances.current)}</td>
                    <td className="stats">
                        <span className="new badge" data-badge-caption="% APR">{this.state.apr}</span>
                    </td>
                </tr>

                <tr className="account-avail">
                    <td className="description">Available:</td>
                    <td>{formatCurrencyValueJSX(avail)}</td>
                    <td></td>
                </tr>

                <tr className="account-limit">
                    <td className="description">Limit:</td>
                    <td>{formatCurrencyValueJSX(this.state.balances.limit)}</td>
                    <td></td>
                </tr>

                {
                    this.state.fees != null
                        ? <tr className="account-fees">
                                <td className="description">Fees:</td>
                                <td>{formatCurrencyValueJSX(this.state.fees)}</td>
                                <td></td>
                            </tr>
                        : <tr></tr>
                }
            </tbody>
        </table>)
    }

    renderCheckingTable() {

        const currentBalance = this.state.balances ? this.state.balances.current : 0
        return (<table className="account-balances">
            <tbody>
                <tr className="account-balance">
                    <td className="description">Balance:</td>
                    <td>{formatCurrencyValueJSX(currentBalance)}</td>
                </tr>
            </tbody>
        </table>)
    }

    renderGigDropdown() {
        if (this.state.user) {
            let buttonLabel = (this.state.gigName)
                ? this.state.gigName
                : 'Gig: ';
            return (<div>
                <a href="#!" className='acct-gig-menu-trigger btn' data-activates='acct-gig-menu'>{buttonLabel}</a>

                <ul id='acct-gig-menu' className='dropdown-content'>
                    {
                        this.state.user.gigs.map(gig => <li key={gig._id} data-value={gig._id}>
                            <a onClick={this.gigSelected.bind(this, gig._id, gig.name)} href="#!">{gig.name}</a>
                        </li>)
                    }
                </ul>
            </div>)
        }
        return (<div></div>)
    }

    render() {
        let accountDetails;
        let dueDate;
        if (this.state.accountType === 'credit') {
            accountDetails = this.renderCreditTable()
            dueDate = <h6 className="account-due">
                <span className='date-due'>Due: {<Moment format="MMMM DD, YYYY">{nextDueDate(this.state.dueDate).toDateString()}</Moment>}</span>
            </h6>
        } else {
            accountDetails = this.renderCheckingTable()
        }
        return (<div className="container fluid">
            <div className="card-panel account-detail">
                <div className="row valign-wrapper s12">
                    <div className="col l7">
                        <h5>
                            <i className="material-icons">credit_card</i>
                            <span className="account-header">
                                {this.state.official_name}</span>
                        </h5>
                        <h5 className="account-number">
                            {this.state.mask}</h5>
                        {dueDate}
                        {this.renderGigDropdown()}
                    </div>

                    <div className="col l5">
                        {accountDetails}
                    </div>
                </div>

                <br/>
                <br/>
                <div className="row account-transations ml-1 mr-1">
                    <Table transactionsUpdated={this.transactionsUpdated.bind(this)} {...this.state}/>
                </div>
            </div>
        </div>);
    }
}


export default AccountDetail;
