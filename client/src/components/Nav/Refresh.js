import React from 'react';
import API from '../../utils/API';

// navbar refresh button
class RefreshButton extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            updated: false
        }

        this.updateUser = this.updateUser.bind(this)
    }

    updateUser() {
        API.accountsSync()
        setTimeout(this.setState({updated: true}), 300)
    }

    componentWillReceiveProps(nextProps) {

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
        return (
            <li className='refresh-btn'>
                <a onClick={this.updateUser} className={'waves-effect waves-light btn-floating z-depth-2 ' + pulseValue}>
                    <i className="material-icons right">autorenew</i>
                </a>
            </li>
        )
    }
}


export default RefreshButton;
