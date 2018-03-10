import React, { Component } from 'react';
import AccountList from '../../components/Dash/AccountList';
import GoalList from '../../components/Dash/GoalList';
import GigList from '../../components/Dash/GigList';


class Dashboard extends Component {

    state = {
        user: {}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user: nextProps.user})
    }

    componentWillMount() {
        this.setState({user: this.props.user})
    }

    render() {
        return (
            <main className='m8'>
                <div className='container-fluid padding-1'>
                    <div className='row'>
                        <div className='col s12'>
                            <h4 className='dash-title'>Dashboard</h4>
                        </div>
                    </div>
                    <div className='row'>

                        {/* Accounts & Goals Lists */}
                        <div className='col s12 m5 l4'>
                            <AccountList user={this.state.user}/>
                            <GoalList/>
                        </div>

                        {/* Gigs List */}
                        <div className='col s12 m7 l8'>
                            <GigList {...this.state.user}/>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Dashboard;
