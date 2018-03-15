import React from 'react';
import AccountList from '../../components/Dash/AccountList';
import GoalList from '../../components/Dash/GoalList';
import GigList from '../../components/Dash/GigList';
import { ModalEditGoal } from '../../components/Modals';
const $ = require('jquery');

class Dashboard extends React.Component {

    componentDidUpdate() {
        window.$('.modal').modal()
    }

    showModal(id) {
        window.$(`#${id}`).modal('open')
    }

    render() {
        const user = this.props.user
        console.log(`Dashboard user: `, user);
        const userName = `${user.firstName} ${user.lastName}`
        return (
            <main className='m8'>
                <div className='container-fluid padding-1'>
                    <div className='row'>
                        <div className='col s6'>
                            <h5 className='dash-title no-caps'>{'Welcome, ' + userName}</h5>
                        </div>
                        <div className='col s6'>

                        </div>
                    </div>
                    <div className='row'>

                        {/* Accounts & Goals Lists */}
                        <div className='col s12 m5 l4'>
                            <AccountList
                                updateStateData={this.updateStateData}
                                user={this.props.user}
                            />

                            <GoalList
                                user={this.props.user}
                            />
                        </div>

                        {/* Gigs List */}
                        <div className='col s12 m7 l8'>
                            <GigList
                                refresh={ this.props.refresh }
                                {...this.props.user}
                            />
                        </div>
                    </div>
                </div>
                <ModalEditGoal
                    user={this.props.user}
                />
            </main>
        );
    }
}

export default Dashboard;
