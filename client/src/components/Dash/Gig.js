import React, { Component } from "react";
import { formatCurrencyValueJSX, formatChangeValueJSX } from '../../utils/currency';
import { ModalAddGoal } from '../Modals';


// materialize gig preview
/*
goals
:
(2) [{…}, {…}]
moneyIn
:
6554.860000000001
moneyOut
:
41902.88000000005
name
:
"Personal"
net
:
-35348.02000000005
spendingByCategory
:
(5) [{…}, {…}, {…}, {…}, {…}]
*/
class Gig extends Component {

    constructor(props) {
        super(props);
        console.log(`gig props: `, props);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(freq) {
        this.setState({frequency: freq})
    };

    render() {
        const gigHref = `/gigs/${this.props._id}`;
        return (
            <div className="card">
              <div className="card-content cardHeader">
                <div className="row">
                  <div className="col s11">
                    <span className="card-title">
                      <a className="side-headers" href={gigHref}>
                        <span className="primaryHeaderText">Gig:  </span>
                        <span className="secondaryHeaderText">{this.props.name}</span>
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
                        <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.moneyIn)}</span>
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
                      <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.moneyOut)}</span>
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
                      <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.net)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                  <ModalAddGoal id={this.props._id}/>
              </div>
            </div>

        );
    }
};


export default Gig;
