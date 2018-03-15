import React, {Component} from 'react';
// import {Account, GigMenu} from '../../components/Accounts';
import Moment from 'react-moment';
import API from '../../utils/API';
import { Table } from '../../components/DataTable';
import {formatCurrencyValueJSX} from '../../utils/currency';
import {formatDate} from '../../utils/date';
import axios from 'axios';


// calculates the next due date of a credit card
//  - returns date object
function nextDueDate(day) {
    const dueDate = new Date();
    const diff = day - dueDate.getDate();
    if (diff < 1) {
        dueDate.setMonth(dueDate.getMonth() + 1)
    }
    dueDate.setDate(day);
    return dueDate;
}


// transaction table headers
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

class AccountDetail extends Component {
    constructor(props) {
        super(props)

        this.hasData = false;
        this.warnCount = 0

        this.state = {
            account_id: this.props.match.params.id,
            transactions: [],
            headers: defaultHeaders,
            gigs: []
        }
    }

    shouldComponentUpdate() {
        return (this.hasData == true)
    }

    componentWillMount() {
        API.getUserGigs()
        .then(gigs => {
            let gigData = []
            gigs.data.forEach(gig => {
                gigData.push({name: gig.name, id: gig._id, description: gig.description})
            })
            alert(JSON.stringify(gigData, null, 2))
            this.setState({gigs: gigData})
        })
        .catch(err => {
            this.hasData = false
            console.log(`Error: `, err);
        })
    }

    componentDidMount() {
        API.getAccount({accountId: this.state.account_id})
        .then(acct => {

            let accountSummary = acct.data.summary || {}
            if (!accountSummary) {
                console.log(` -> Warning: account data not received: `, acct.data);
            }

            this.setState(acct.data)
            this.hasData = true;
        })
        .catch(err => {
            this.hasData = false
            console.log(`Error: `, err);
        })
    }

    gigSelected(gigId, gigName) {
        if (this.state.gigName === gigName) {
            return
        }

        this.setState({gigName: gigName})
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
                const role = (data.role == 'vendor') ? 'transactionName' : data.role
                t[role] = data.value.newValue;
            }
            transdata.push(t)
        })

        this.setState({transactions: transdata})
    }

    // default page
    renderLoading() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="card account-detail">
                   <div className="card-header">
                       <div className="account-detail-header">
                          <div className="row valign-wrapper">
                            <div className="col s12 m6 left-align text-left">
                              <span style={{verticalAlign: 'middle'}} className="card-title white-text left-align">Loading...</span>
                            </div>
                            <div className="col s12 m6 right-align">
                              <span className="account-avail white-text"></span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    // render the header for sabings & checking accounts
    renderCheckingHeader(iconName, accountName, availableBalance, currentBalance) {
        return (
            <div className="account-detail-header">
               <div className="row valign-wrapper">
                 <div className="col s12 m6 left-align text-left">
                   <span style={{verticalAlign: 'middle'}} className="card-title white-text left-align"><span  className={iconName}></span>  {accountName} - <span className="account-num">{this.state.mask}****</span></span>
                 </div>
                 <div className="col s12 m6 right-align">
                   <span className="account-avail white-text"> Available Balance: <span className="account-balance">{formatCurrencyValueJSX(availableBalance)}</span></span>
                 </div>
               </div>
            </div>
        )
    }

    // render the header for credit accounts
    renderCreditHeader(iconName, accountName, availableBalance, currentBalance, currentLimit, dueDate, apr, fees) {
        return (
            <div className="account-detail-header">
               <div className="row valign-wrapper">
                 <div className="col s12 m6 left-align text-left">
                   <span style={{verticalAlign: 'middle'}} className="card-title white-text left-align"><span  className={iconName}></span>  {accountName} - <span className="account-num">{this.state.mask}****</span></span>
                 </div>
                 <div className="col s12 m6 right-align">
                   <span className="account-avail white-text"> Available Balance: <span className="account-balance">{formatCurrencyValueJSX(availableBalance)}</span></span>
                 </div>
               </div>

               <div className="row valign-wrapper pl-2">
                 <div className="col s12 m6">
                   <span className="card-subtitle white-text"> Due on: <span className="account-num">{dueDate}</span></span>
                 </div>
                 <div className="col s12 m6 right-align">
                   <span className="card-subtitle white-text"> Current: <span className="account-limit">{formatCurrencyValueJSX(currentBalance)}</span></span>
                 </div>
               </div>

               <div className="row valign-wrapper pl-2">
                 <div className="col s12 m6">
                 </div>
                 <div className="col s12 m6 right-align">
                   <span className="card-subtitle white-text"> Limit: <span className="account-limit">{formatCurrencyValueJSX(currentLimit)}</span></span>
                 </div>
               </div>


               <div className="row valign-wrapper pl-2">
                 <div className="col s12 m6">
                   <div className="chips chips-autocomplete" />
                 </div>
                 <div className="col s12 m6 right-align">
                   <span className="card-subtitle white-text"> Fees: <span className="account-fees">{formatCurrencyValueJSX(fees)}</span><span className="new badge" data-badge-caption="% APR">{apr}</span></span>
                 </div>
               </div>
            </div>
        )
    }

    render() {
        console.log(`-> AccountDetail summary: `, this.state.summary || {});

        let accountSummary = this.state.summary || {}
        let hasBalances = (Object.keys(accountSummary).length > 0)

        if (!hasBalances) {
            return (
                this.renderLoading()
            )
        }

        // account type
        const isCreditAccount = (this.state.summary.type == 'credit')
        const iconName = (isCreditAccount) ? 'icon-credit-card-1' : 'icon-banknote' // 'icon-bank-notes'

        // account name
        const accountName = accountSummary ? this.state.summary.official_name ? this.state.summary.official_name : this.state.summary.name : 'null'

        // HARD-CODED DATA
        const dueDate = formatDate(nextDueDate(21))
        const apr = 7

        // balances
        let availableBalance = accountSummary.balances ? accountSummary.balances.available : 0
        let fees = 0;

        if (isCreditAccount) {
            availableBalance = (accountSummary.balances.limit - accountSummary.balances.current);
            fees = (apr / 100) * accountSummary.balances.current
        }

        const currentBalance = accountSummary.balances ? accountSummary.balances.current : 0
        const currentLimit = accountSummary.balances ? accountSummary.balances.limit : 0


        if (this.hasData) {
            if (this.state.transactions.length == 0 && this.warnCount == 0) {
                window.Materialize.toast('No transactions found, please sync your account', 5000)
                this.warnCount = this.warnCount + 1
            }
        }

        let headerContent;
        if (isCreditAccount) {
            headerContent = this.renderCreditHeader(iconName, accountName, availableBalance, currentBalance, currentLimit, dueDate, apr, fees)
        } else {
            headerContent = this.renderCheckingHeader(iconName, accountName, availableBalance, currentBalance)
        }

        return (
            <div className="row">
                <div className="col s12">
                    <div className="card account-detail">
                       <div className="card-header">

                           {headerContent}

                       </div>
                   <div className="card-content">

                     <div className="row">
                       <div className="col s12">

                           <Table
                               transactionsUpdated={this.transactionsUpdated.bind(this)}
                               {...this.state}
                           />
                       </div>
                     </div>
                   </div>
                 </div>
             </div>
         </div>

       );
    }
}


export default AccountDetail;
