import "./GigView.css";
import React, { Component } from "react";


class ExpenseSummary extends Component {

    state = {
            gig: { 
              gigName: "Uber",  
              moneyIn: 7200.25,
              moneyOut: 1875.11,
              net: 4575.22,
            }

    };

    render() {
        return (

            <ul className="collection with-header">
            <li className="collection-header listHeader"><h6><i className="material-icons iconStyleSmall">pie_chart</i> EXPENSE SUMMARY</h6></li>
          <li className="collection-item">VENDOR:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyIn}</span>}</span></li>
          <li className="collection-item">VENDOR:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyOut}</span>}</span></li>
          <li className="collection-item">VENDOR:<span className="right">{<span><sup>$</sup>{this.state.gig.net}</span>}</span></li>
        </ul>

);
    };
}

export default ExpenseSummary;