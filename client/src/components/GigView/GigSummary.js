import React, { Component } from "react";
import "./GigView.css";

class GigSummary extends Component {

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

            <ul class="collection with-header">
            <li className="collection-header listHeader"><h6><i className="material-icons iconStyleSmall">track_changes</i> GIG SUMMARY</h6></li>
          <li className="collection-item">MONEY IN:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyIn}</span>}</span></li>
          <li className="collection-item">EXPENSES:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyOut}</span>}</span></li>
          <li className="collection-item">NET:<span className="right">{<span><sup>$</sup>{this.state.gig.net}</span>}</span></li>
        </ul>

);
    };
}

export default GigSummary;