import React, {Component} from "react";
import Alert from './Alert';

class Sidebar extends Component {

    state = {
        alerts: [
            {
                id: 1,
                name: 'Uber Goal at 80%',
                value: '3 days to goal deadline',
                date: '17:00'
            },
            {
                id: 2,
                name: 'Checking balance low',
                date: '17:00'
            }
        ]
    };

    render() {
        return (<aside id="right-sidebar-nav">
            <ul id="user-slideout" className="side-nav rightside-navigation">
                <li className="li-hover">
                    <div className="row">
                        <div className="col s12 border-bottom-1 mt-5">

                            {/* <!--  Tabs --> */}
                            <ul className="tabs">
                                <li className="tab col s4">
                                    <a href="#tab-actions" className="active">
                                        <span className="material-icons grey-text">account_circle</span>
                                    </a>
                                </li>
                                <li className="tab col s4">
                                    <a href="#tab-alerts">
                                        <span className="material-icons grey-text scale-transition pulse">report_problem</span>
                                    </a>
                                </li>
                                <li className="tab col s4">
                                    <a href="#tab-settings">
                                        <span className="material-icons grey-text">settings</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* <!-- Actions Tab --> */}
                        <div id="tab-actions" className="col s12">
                            <h6 className="mt-5 mb-3 ml-3 side-tab-header">Actions</h6>
                            <div className="divider"></div>
                        </div>

                        {/* <!-- Alerts Tab --> */}
                        <div id="tab-alerts" className="col s12">
                            <h6 className="mt-5 mb-3 ml-3 side-tab-header">Alerts</h6>
                            <div className="divider"></div>
                            <div className="collection border-none">
                                {this.state.alerts.map((alrt, i) => {
                                        return (
                                            <Alert
                                                key={i}
                                                id={alrt.id}
                                                name={alrt.name}
                                                value={alrt.value}
                                                date={alrt.date}
                                            />
                                        )
                                    })}
                            </div>
                        </div>

                        {/* <!-- Settings Tab --> */}
                        <div id="tab-settings" className="col s12">
                            <h6 className="mt-5 mb-3 ml-3 side-tab-header">Settings</h6>
                            <div className="divider"></div>

                            <ul className="collection border-none">
                                <li className="collection-item border-none">
                                  <div className="m-0">
                                    <span className="font-weight-600">Notifications</span>
                                    <div className="switch right">
                                      <label>
                                        <input type="checkbox"/>
                                        <span className="lever"></span>
                                      </label>
                                    </div>
                                  </div>
                                  <p>Allow account notifications.</p>
                                </li>
                            </ul>

                        </div>
                    </div>
                </li>
            </ul>
        </aside>);
    }
}




export default Sidebar;
