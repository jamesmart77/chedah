import React, {Component} from "react";
// import {Badge, Chip} from 'react-materialize';
import Account from './Account';
import API from '../../utils/API';


// materialize account list
class AccountList extends Component {

    state = {
        collapsed: false,
        user: {
            accounts: []
        }
    }

    handleClick() {
        this.setState({collapsed: !this.state.collapsed})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user: nextProps})
    }

    renderListItems() {
        const accounts = this.props.user.accounts || []
        const hasAccounts = (accounts.length > 0)
        let results = [
            <div key={0} className="row pl-2 valign-wrapper">
            <span><i className="material-icons inflex">warning</i> Please Link an Account</span>
            </div>
        ]

        if (hasAccounts) {
            results = accounts.map(acct =>
                <Account key={acct._id} {...acct}/>
            )
        }
        return results
    }

    render() {
        const arrowName = (this.state.collapsed === false) ? 'arrow_drop_down' : 'arrow_drop_up';

        return (
            <ul className="account-summary collapsible collection with-header" datacollapsible="expandable">
                <li>

                    <div className="collapsible-header listHeader" onClick={this.handleClick.bind(this)}>
                        <h6><i className="material-icons iconStyleSmall">account_balance</i> Accounts</h6>
                        <i className="header-expand-state material-icons">{arrowName}</i>
                    </div>

                    {this.renderListItems()}

                </li>
            </ul>
        );
    }
}

export default AccountList;
