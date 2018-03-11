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
        const listItems = ['edit account', 'add gig', 'remove account']
        return (
            <div key={this.props.account._id} className="card account-view-card">
                <div className="card-content">
                    <div className="row">


                            <span className="card-title">
                                <span className={iconName}></span>
                                <a href={'/accounts/' + this.props.account._id}>  {this.props.account.name}</a>
                                <HeaderMenu items={listItems} />
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
