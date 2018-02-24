import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Panel from "../../components/Panel";
import { List, ListItem } from "../../components/List";
import { Card } from 'react-materialize';
// import MaterialButton from "../../components/MaterialButton";
// import API from "../../utils/API";


class GigDetail extends React.Component {
    state = {
          gig: { 
            gigName: "Uber",  
            moneyIn: 7200.25,
            moneyOut: 1875.11,
            net: 4575.22,
          },
          goals:  [
            { name:"Spend Less On Tolls", budget: 200, spent: 100, net: 100 },
            { name:"Another Goal Goes Here", budget: 425, spent: 300, net: 125 },            
        ]
      };


    render() {
        return (
            <Container fluid>
              <div className="row">
                  <div className="col s12">
                      <h4 className='dash-title'>{this.state.gig.gigName} Dashboard</h4>
                  </div>
              </div>
      
              <div className="row">
                <div className="col s12 m5 l4">

                 <ul class="collection with-header">
        <li class="collection-header grey lighten-2"><h6>GIG SUMMARY</h6></li>
      <li class="collection-item">MONEY IN:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyIn}</span>}</span></li>
      <li class="collection-item">EXPENSES:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyOut}</span>}</span></li>
      <li class="collection-item">NET:<span className="right">{<span><sup>$</sup>{this.state.gig.net}</span>}</span></li>
    </ul>

       <ul class="collection with-header">
        <li class="collection-header grey lighten-2"><h6>EXPENSE SUMMARY</h6></li>
      <li class="collection-item">VENDOR:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyIn}</span>}</span></li>
      <li class="collection-item">VENDOR:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyOut}</span>}</span></li>
      <li class="collection-item">VENDOR:<span className="right">{<span><sup>$</sup>{this.state.gig.net}</span>}</span></li>
    </ul>


                </div>
    

    
 
                <div className="col s12 m7 l8">
                  {/* <div className="divider"></div> */}
                  <div className="row valign-wrapper grey lighten-2">
                  <div className="col s9">
                  <h5 className='dash-title'>{this.state.gig.gigName} Goals</h5>
                  </div>
                  <div className="col s3">
                  <a href=""><i className="small material-icons right grey-text">add_circle_outline</i></a>
                  </div>
                  </div>
              
           

 {this.state.goals.map(goal => {
                    return (
<div className="card gig-dash-card">
        <div className="card-content blue-grey darken-4">
            <div className="row">
                <div className="col s9">
                    <span className="card-title white-text">{goal.name}</span>
                </div>
                <div className="col s3">
                  <a href=""><i className="small material-icons right grey-text">add_circle_outline</i></a>
                  </div>
            </div>

         </div>
         <div className="card-content white">
            <div className="row">
                <div className="col m4">
                    <div className="row">
                        <div className="col">
                            <span className="gig-dash-subtitle">Budget</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span className="gig-dash-total">{<span><sup>$</sup>{goal.budget}</span>}</span>
                        </div>
                    </div>
                </div>

              
                <div className="col m4">
                    <div className="row">
                        <div className="col">
                            <span className="gig-dash-subtitle">Expenses</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="gig-dash-total">{<span><sup>$</sup>{goal.spent}</span>}</span>
                    </div>
                </div>

                {/* Net */}
                <div className="col m4">
                    <div className="row">
                        <div className="col">
                            <span className="gig-dash-subtitle">Net</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="gig-dash-total">{<span><sup>$</sup>{goal.net}</span>}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

);
})} 


   
    

<div className="row valign-wrapper grey lighten-2">
<div className="col s12">
                    <h5 className='dash-title'>{this.state.gig.gigName} Transactions</h5>
            </div>
            </div>
            
                  <table className="striped">
                    <thead>
                      <tr>
                        <td>Date</td>
                        <td>Vendor</td>
                        <td>Category</td>
                        <td>Gig</td>
                        <td>Amount</td>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                      </tr>
                      <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                      </tr>
                    </tbody>
                  </table>

            
                </div>

              </div>
           
            </Container>

        );
    }

}





export default GigDetail;