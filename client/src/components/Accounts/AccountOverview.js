import React, {Component} from 'react';
import CreditCardAPR from './APR'

// account preview component
class AccountOverview extends Component {

    componentWillMount() {
        this.setState({...this.props})
    }

    render() {
        console.log(`AccountOverview: `, this.state);
        const icon = (this.state.type === 'credit') ? 'credit_card' : 'attach_money'
        return (
            <div key={this.state._id} className="card account-view-card">
                <div className="card-content">
                    <div className="row">
                        <div className="col">
                            <span className="card-title">
                                <i className='material-icons inflex'>{icon}</i>
                                <a href={'/accounts/' + this.state._id}>{this.state.name}</a>

                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountOverview;
