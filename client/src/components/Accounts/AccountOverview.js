import React from 'react';
// import CreditCardAPR from './APR'
import  HeaderMenu from '../Dash/HeaderMenu';


// account preview component (for accounts home)
class AccountOverview extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        // const iconName = (this.props.account.type === 'credit') ? 'credit_card' : 'attach_money'
        const iconName = (this.props.account.type == 'credit') ? 'icon-credit-card-1' : 'icon-banknote'
        const listItems = [{id: 1, name: 'edit account'}, {id: 2, name: 'add gig'}, {id: 3, name: 'remove account'}]
        return (
            <div key={this.props.account._id} className="card account-view-card">
                <div className="card-content">
                    <div className="row">


                            <span className="card-title">
                                <span className={iconName}></span>
                                <a href={'/accounts/' + this.props.account.account_id}>  {this.props.account.name}</a>
                                <HeaderMenu id={this.props.account.account_id} items={listItems} />
                            </span>

                            <span className="account-actions">

                            </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountOverview;
