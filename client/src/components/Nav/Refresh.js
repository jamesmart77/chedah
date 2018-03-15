import React from 'react';
import API from '../../utils/API';

// navbar refresh button
class RefreshButton extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            updated: false,
            showTooltip: true
        }

        this.updateUser = this.updateUser.bind(this)
    }

    updateUser() {
        API.accountsSync()
        setTimeout(this.setState({updated: true, showTooltip: false}), 300)
    }

    getTransactions() {
        return this.props.user.accounts || []
    }

    render() {
        const accounts = this.getTransactions()
        let tcount = 0
        accounts.forEach(acct => {
            tcount += acct.transactions.length
        })

        const pulseValue = (tcount == 0) ? 'pulse' : ''
        const ttip = (this.state.showTooltip) ? ' tooltipped' : ''
        return (
            <li className='refresh-btn'>
                <a onClick={this.updateUser} data-position="bottom" data-delay="50" data-tooltip="sync account & transaction" className={'waves-effect waves-light btn-floating z-depth-2 ' + pulseValue + ttip}>
                    <i className="material-icons right">autorenew</i>
                </a>
            </li>
        )
    }
}


export default RefreshButton;
