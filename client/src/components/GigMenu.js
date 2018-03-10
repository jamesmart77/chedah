import React from 'react';
import API from '../../utils/API';

/*
<ul id="desktop-main-menu" className="dropdown-content">
    <li><a href="/accounts"><i className="large material-icons">account_balance</i>Accounts</a></li>
    <li><a href="#!"><i className="large material-icons">work</i>Gigs</a></li>
    <li><a href="#!"><i className="large material-icons">insert_chart</i>Goals</a></li>
    <li className="divider"></li>
    <li><a href="#!" onClick={() => API.accountsSync()}><i className="large material-icons">sync</i>Sync Accounts</a></li>
    <li className="divider"></li>
    <PlaidAccountLink><i className="large material-icons">insert_link</i>Link Account</PlaidAccountLink>
    <li className="divider"></li>
    <li><a href="#!" onClick={() => logout()}><i className="large material-icons">keyboard_tab</i>Log Out</a></li>
    <li className="divider"></li>
</ul>
*/


class GigMenu extends React.Component {

    render() {
        return (
            <a data-activates={this.props.id} className="button-collapse"><i className="material-icons">{this.props.name}</i></a>
            <select>
            </select>
        );
    }
}


export default GigMenu;
