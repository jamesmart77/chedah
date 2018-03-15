import React from 'react';
import API from '../../utils/API';

// navbar refresh button
class RefreshButton extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            updated: false,
            showTooltip: true,
            isBusy: false
        }

        this.updateUser = this.updateUser.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isBusy: false})
    }

    updateUser() {
        API.accountsSync()
        this.setState({updated: true, showTooltip: false, isBusy: true})
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
        const tooltipState = (this.state.showTooltip) ? ' tooltipped' : ''
        const spinState = (this.state.isBusy) ? ' spin' : ''
        return (
            <li className='refresh-btn'>
                <a onClick={this.updateUser} data-position="bottom" data-delay="50" data-tooltip="sync account & transaction" className={'waves-effect waves-light btn-floating z-depth-2 ' + pulseValue + tooltipState + spinState}>
                    <i className="material-icons right">autorenew</i>
                </a>
            </li>
        )
    }
}


export default RefreshButton;
