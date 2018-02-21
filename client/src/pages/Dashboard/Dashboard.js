import React, { Component } from 'react';
import { Col, Row, Container } from 'react-materialize';
import AccountList from '../../components/Dash/AccountList';
import GoalList from '../../components/Dash/GoalList';
import GigList from '../../components/Dash/GigList';


class Dashboard extends Component {

  render() {
    return (
        <main class='m8'>
            <div class='container-fluid padding-2'>
                <div class='row'>
                    <div class='col s12'>
                        <h4 class='dash-title'>Dashboard</h4>
                    </div>
                </div>

                <div class='row'>


                    {/* Accounts & Goals Lists */}
                    <div class="col s12 m6 l3">
                        <AccountList/>
                        <GoalList/>
                    </div>

                    {/* Gigs List */}
                    <div class="col s12 m6 l9">
                        <GigList/>
                    </div>
                </div>
            </div>
    </main>);
  }
}

export default Dashboard;
