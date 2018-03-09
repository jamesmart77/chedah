import React, { Component } from "react";
import { formatCurrencyValueJSX, formatChangeValueJSX } from '../../utils/currency';
import { ModalAddGoal } from '../Modals';


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
    };

    render() {
        const gigHref = `/gigs/${this.state.id}`;
        return (
            <div className="card">
              <div className="card-content cardHeader">
                <div className="row">
                  <div className="col s11">
                    <span className="card-title">
                      <a className="side-headers" href={gigHref}>
                        <span className="primaryHeaderText">Gig:  </span>
                        <span className="secondaryHeaderText">{this.state.name}</span>
                      </a>
                    </span>
                  </div>
                </div>

              </div>
              <div className="card-content cardBody">
                <div className="row">
                  <div className="col m12 l4">
                    <div className="row">
                      <div className="col">
                        <span className="gig-dash-subtitle">In</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span className="gig-dash-total">{formatCurrencyValueJSX(this.state.income)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col m12 l4">
                    <div className="row">
                      <div className="col">
                        <span className="gig-dash-subtitle">Expenses</span>
                      </div>
                    </div>
                    <div className="row">
                      <span className="gig-dash-total">{formatCurrencyValueJSX(this.state.expenses)}</span>
                    </div>
                  </div>

                  {/* Net */}
                  <div className="col m12 l4">
                    <div className="row">
                      <div className="col">
                        <span className="gig-dash-subtitle">Net</span>
                      </div>
                    </div>
                    <div className="row">
                      <span className="gig-dash-total">{formatCurrencyValueJSX(this.state.net)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                  <ModalAddGoal id={this.state.id}/>
              </div>
            </div>

        );
    }
};


export default Gig;
