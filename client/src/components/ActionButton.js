import React, { Component } from "react";
import { Button } from "react-materialize";

// materialize floating action button
class ActionButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'dashboard'
        };
        // this.handleClick = this.handleClick.bind(this);
    };

    render() {
      return (
        <div className="fixed-action-btn click-to-toggle" style={{bottom:'24px', right:'24px'}}>
          <a className="btn-floating btn-large red"><i className="large material-icons">add</i></a>
            <ul>
                <li>
                    <a href="#" className="btn-floating amber darken-1"><i className="material-icons">work</i></a>
                    <a href="#" className="btn-floating mobile-fab-tip">Add Gig</a>
                </li>
                <li>
                    <a href="#" className="btn-floating blue"><i className="material-icons">account_balance</i></a>
                    <a href="#" className="btn-floating mobile-fab-tip">Add Account</a>
                </li>
                <li>
                    <a href="#" className="btn-floating red modal-trigger"><i className="material-icons">supervisor_account</i></a>
                    <a href="#" className="btn-floating mobile-fab-tip modal-trigger">Add Item</a>
                </li>
            </ul>
        </div>
      )
    };
};


export default ActionButton;
