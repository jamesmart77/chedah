import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Panel from "../../components/Panel";
import { List, ListItem } from "../../components/List";
import { Card } from 'react-materialize';
// import API from "../../utils/API";
import GigSummary from '../../components/GigView/GigSummary';
import ExpenseSummary from '../../components/GigView/ExpenseSummary';
import GoalSummary from '../../components/GigView/GoalSummary';


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
              <div className="row valign-wrapper">
                  <div className="col s6">
                      <h4 className='dash-title'>{this.state.gig.gigName} Dashboard</h4>
                  </div>
                  
                  <div className="col s6">
                  <h6 className="right"><a href="" className="grey-text">Add An {this.state.gig.gigName} Goal<i className="small material-icons right teal-text">add_circle</i></a></h6>
                  </div>
                  
              </div>
      
              <div className="row">
                <div className="col s12 m5 l4">

         <GigSummary />
         <ExpenseSummary />

                </div>   
 
                <div className="col s12 m7 l8">
               
                <GoalSummary />


   <div className="card gig-dash-card">
        <div className="card-content blue-grey darken-4">
            <div className="row">
                <div className="col s12">
                    <span className="card-title"><span className="teal-text">Transactions: </span> <span className="white-text">{this.state.gig.gigName}</span></span>
                </div>
                
            </div>

         </div>
         <div className="card-content white">
            <div className="row">
                <div className="col s12">
            
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
              </div>
              </div>
              </div>
          </div> 
           
           
            </Container>

        );
    }

}





export default GigDetail;