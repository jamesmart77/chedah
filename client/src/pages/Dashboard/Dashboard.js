import React from 'react';
import AccountList from '../../components/Dash/AccountList';
import GoalList from '../../components/Dash/GoalList';
import GigList from '../../components/Dash/GigList';


class Dashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({user: nextProps.user})
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
                            <AccountList updateStateData={this.updateStateData} user={this.props.user}/>
                            <GoalList user={this.props.user}/>
                        </div>

                        {/* Gigs List */}
                        <div className='col s12 m7 l8'>
                            <GigList resfresh={ this.props.refresh } {...this.props.user}/>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Dashboard;
