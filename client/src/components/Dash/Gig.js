import React, { Component } from "react";


// materialize gig preview
const Gig = props => (

    <div className="card gig-dash-card">
        <div className="card-content">
            <div className="row">
                <div className="col">
                    <span className="card-title">{props.name}</span>
                </div>
                <div className="col">
                    <a className="dropdown-button gig-frequency right" href="#!" data-activates="frequency-gig-217"><i className="material-icons right">arrow_drop_down</i></a>
                    <ul className="dropdown-content">
                        <li><a href="#!">this week</a></li>
                        <li><a href="#!">this month</a></li>
                        <li><a href="#!">this year</a></li>
                    </ul>
                </div>
            </div>

            {/* In */}
            <div className="row">
                <div className="col m4">
                    <div className="row">
                        <div className="col">
                            <span className="gig-dash-subtitle">In</span>
                        </div>
                        <div className="col">
                            <span className="gig-dash-loss">{props.inchange}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span className="gig-dash-total">{props.income}</span>
                        </div>
                    </div>
                </div>

                {/* Out */}
                <div className="col m4">
                    <div className="row">
                        <div className="col">
                            <span className="gig-dash-subtitle">Out</span>
                        </div>
                        <div className="col">
                            <span className="gig-dash-gain">{props.expchange}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="gig-dash-total">{props.expenses}</span>
                    </div>
                </div>

                {/* Net */}
                <div className="col m4">
                    <div className="row">
                        <div className="col">
                            <span className="gig-dash-subtitle">Net</span>
                        </div>
                        <div className="col">
                            <span className="gig-dash-gain">{props.netchange}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="gig-dash-total">{props.net}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Gig;
