import React, { Component } from "react";


// materialize gig preview
// props = {name: "Gig Name", income: 2100, expenses: 800, net: 1300}
const Gig = props => (

    <div class="card gig-dash-card">
        <div class="card-content">
            <div class="row">
                <div class="col">
                    <span class="card-title">{props.name}</span>
                </div>
                <div class="col">
                    <a class="dropdown-button gig-frequency right" href="#!" data-activates="frequency-gig-217"><i class="material-icons right">arrow_drop_down</i></a>
                    <ul class="dropdown-content">
                        <li><a href="#!">this week</a></li>
                        <li><a href="#!">this month</a></li>
                        <li><a href="#!">this year</a></li>
                    </ul>
                </div>
            </div>

            {/* In */}
            <div class="row">
                <div class="col m4">
                    <div class="row">
                        <div class="col">
                            <span class="gig-dash-subtitle">In</span>
                        </div>
                        <div class="col">
                            <span class="gig-dash-loss">{props.inchange}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <span class="gig-dash-total">{props.income}</span>
                        </div>
                    </div>
                </div>

                {/* Out */}
                <div class="col m4">
                    <div class="row">
                        <div class="col">
                            <span class="gig-dash-subtitle">Out</span>
                        </div>
                        <div class="col">
                            <span class="gig-dash-gain">{props.expchange}</span>
                        </div>
                    </div>
                    <div class="row">
                        <span class="gig-dash-total">{props.expenses}</span>
                    </div>
                </div>

                {/* Net */}
                <div class="col m4">
                    <div class="row">
                        <div class="col">
                            <span class="gig-dash-subtitle">Net</span>
                        </div>
                        <div class="col">
                            <span class="gig-dash-gain">{props.netchange}</span>
                        </div>
                    </div>
                    <div class="row">
                        <span class="gig-dash-total">{props.net}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Gig;
