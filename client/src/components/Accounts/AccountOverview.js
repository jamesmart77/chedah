import React, {Component} from 'react';
import CreditCardAPR from './APR'

// account preview component
class AccountOverview extends Component {
    render() {
        const icon = (this.props.accountType === 'credit') ? 'credit_card' : 'attach_money'
        return (
            <div key={this.props._id} className="card account-view-card">
                <div className="card-content">
                    <div className="row">
                        <div className="col">
                            <span className="card-title">
                                <i className='material-icons inflex'>{icon}</i>
                                <a href={'/accounts/' + this.props._id}>{this.props.name}</a>

                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountOverview;
