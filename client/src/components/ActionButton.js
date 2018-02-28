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
        <div class="fixed-action-btn click-to-toggle" style={{bottom:'24px', right:'24px'}}>
          <a class="btn-floating btn-large red"><i class="large material-icons">add</i></a>
            <ul>
                <li>
                    <a href="#" class="btn-floating amber darken-1"><i class="material-icons">work</i></a>
                    <a href="#" class="btn-floating mobile-fab-tip">Add Gig</a>
                </li>
                <li>
                    <a href="#" class="btn-floating blue"><i class="material-icons">account_balance</i></a>
                    <a href="#" class="btn-floating mobile-fab-tip">Add Account</a>
                </li>
                <li>
                    <a href="#" class="btn-floating red modal-trigger"><i class="material-icons">supervisor_account</i></a>
                    <a href="#" class="btn-floating mobile-fab-tip modal-trigger">Add Item</a>
                </li>
            </ul>
        </div>
      )
    };
};


export default ActionButton;
