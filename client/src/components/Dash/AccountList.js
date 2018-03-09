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
        console.log(`AccountList: willReceiveProps: `, nextProps);
        this.setState({user: nextProps})
    }

    componentWillMount() {
        console.log(`AccountList: willMount: `, this.props.user);
        this.setState({user: this.props.user})
    }

    render() {
        const arrowName = (this.state.collapsed === false) ? 'arrow_drop_down' : 'arrow_drop_up';
        let accounts = this.state.user.accounts || []
        return (
            <ul className="account-summary collapsible collection with-header" datacollapsible="expandable">
                <li>
                    {/* Header */}
                    <div className="collapsible-header listHeader" onClick={this.handleClick.bind(this)}>
                        <h6><i className="material-icons iconStyleSmall">account_balance</i> Accounts</h6>
                        <i className="header-expand-state material-icons">{arrowName}</i>
                    </div>

                    {/* Body insert_chart */}
                    {accounts.map((account, i) => (
                        <Account key={i} {...account} />
                    ))}
                </li>
            </ul>
        );
    }
}

export default AccountList;
