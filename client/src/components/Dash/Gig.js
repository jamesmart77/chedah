import React, { Component } from "react";
import { formatCurrencyValueJSX, formatChangeValueJSX } from '../../utils/currency';


// materialize gig preview
class Gig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            income: props.income,
            inchange: props.inchange,
            expenses: props.expenses,
            expchange: props.expchange,
            net: props.net,
            netchange: props.netchange,
            frequency: 'week'
        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(freq) {
        this.setState({frequency: freq})
    }

    render() {
        return (
            <div className="card gig-dash-card">
                <div className="card-content">
                    <div className="row">
                        <div className="col">
                            <span className="card-title">{this.state.name}</span>
                        </div>
                        <div className="col right">
                            <a className="dropdown-button gig-frequency" href="#!" data-activates={'frequency-gig-' + this.state.id}>{'this ' + this.state.frequency}<i className="material-icons">arrow_drop_down</i></a>

                              <ul id={'frequency-gig-' + this.state.id} className="dropdown-content gig-dropdown">
                                  <li className="gig-frequency-item"><a href="#!" onClick={this.handleClick.bind(null, 'week')}>this week</a></li>
                                  <li className="gig-frequency-item"><a href="#!" onClick={this.handleClick.bind(null, 'month')}>this month</a></li>
                                  <li className="gig-frequency-item"><a href="#!" onClick={this.handleClick.bind(null, 'year')}>this year</a></li>
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
                                    {formatChangeValueJSX(this.state.inchange)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                            <span className="gig-dash-total">{formatCurrencyValueJSX(this.state.income)}</span>
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
                                    {formatChangeValueJSX(this.state.expchange, true)}
                                </div>
                            </div>
                            <div className="row">
                                        <span className="gig-dash-total">{formatCurrencyValueJSX(this.state.expenses)}</span>
                            </div>
                        </div>

                        {/* Net */}
                        <div className="col m4">
                            <div className="row">
                                <div className="col">
                                    <span className="gig-dash-subtitle">Net</span>
                                </div>
                                <div className="col">
                                    {formatChangeValueJSX(this.state.netchange)}
                                </div>
                            </div>
                            <div className="row">
                                <span className="gig-dash-total">{formatCurrencyValueJSX(this.state.net)}</span>
                            </div>
                        </div>
                      </div>
                  </div>
            </div>
          )
      };
};

export default Gig;
