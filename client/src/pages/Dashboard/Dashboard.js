import React, { Component } from 'react';
import AccountList from '../../components/Dash/AccountList';
import GoalList from '../../components/Dash/GoalList';
import GigList from '../../components/Dash/GigList';
import API from '../../utils/API';
import { ModalAddGig, ModalAddGoal } from '../../components/Modals';


class Dashboard extends Component {
    constructor(props) {
        super(props)
        // user, accounts, gigs, goals, categories
        this.state = {
            accounts: [],
            goals: [],
            user: {},
            categories: [],
            gigs: []
        }
    }

    componentWillMount() {
        API.loadUserData()
        .then(userData => {
            this.setState(userData)
            console.log(`-> Dashboard: `, userData);
        })
        .catch(console.log)
    }

    componentDidMount(){
        this.getGigData();
    }

    // TODO: this should be calling back to a controller
    getGigData(gigId) {

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
                        <ModalAddGig/>
                        <ModalAddGoal/>
                    <div className='row'>

                        {/* Accounts & Goals Lists */}
                        <div className='col s12 m5 l4'>
                            <AccountList {...this.state}/>
                            <GoalList/>
                        </div>

                        {/* Gigs List */}
                        <div className='col s12 m7 l8'>
                            <GigList {...this.state}/>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Dashboard;
