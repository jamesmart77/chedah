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
import TransactionSummary from '../../components/Transactions/TransactionSummary';


class GigDetail extends React.Component {
    state = {
          gig: { 
            gigName: "Uber",     
          },    
      };


    render() {
        return (
            <Container fluid>
              <div className="row">
                  <div className="col s6">
                      <h4 className='dash-title'>{this.state.gig.gigName} Dashboard</h4>
                  </div>
                  
                  <div className="col s6">
                  <h6 className="right"><a href="" className="grey-text">Add An {this.state.gig.gigName} Goal<i className="material-icons iconStyleMed">add_circle</i></a></h6>
                  </div>
                  
              </div>
      
              <div className="row">
                <div className="col s12 m5 l4">

               <GigSummary />
               <ExpenseSummary />

                </div>   
 
                <div className="col s12 m7 l8">
               
                <GoalSummary />

               <TransactionSummary />
   

              </div>
          </div> 
           
           
            </Container>

        );
    }

}





export default GigDetail;
