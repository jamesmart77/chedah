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
<<<<<<< HEAD
          gig: { 
            gigName: "Uber",     
          },    
=======
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
>>>>>>> 2c257e8e4c3b36b3e0b0c0043e8fb73e2a17176c
      };


    render() {
        return (
            <Container fluid>
<<<<<<< HEAD
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
=======
             <div className="row">
              <div className="col s12">
            <h1>{this.state.gig.gigName}</h1>
            </div>
            </div>

        <div style={{clear: 'both'}} className="row">
        <div className="col s4">
        <Panel color="blue-grey darken-4" title="MONEY IN" value={<span><sup>$</sup>{this.state.gig.moneyIn}</span>}/>
        </div>
        <div className="col s4">
          <Panel color="blue-grey darken-4" title="MONEY OUT" value={<span><sup>$</sup>{this.state.gig.moneyOut}</span>}/>
        </div>
        <div className="col s4">
          <Panel color="blue-grey darken-4" title="NET" value={<span><sup>$</sup>{this.state.gig.net}</span>}/>
        </div>
      </div>

    <div className="row">
              <div className="col s12">
              <div className="divider"></div>
            <h4>{this.state.gig.gigName} Goals</h4>
            </div>
            </div>

              {this.state.goals.map((goal, i) => {
                  return (
            // <div style={{clear: 'both'}} className="row">
       <div key={i} className="row">
              <div className="col s12">
              <div className="divider"></div>
            <h5>{goal.name}</h5>
            </div>

        <div className="col s4">
          <Panel color="teal" title="BUDGET" value={<span><sup>$</sup>{goal.budget}</span>}/>
        </div>
        <div className="col s4">
          <Panel color="teal" title="SPENT" value={<span><sup>$</sup>{goal.spent}</span>}/>
        </div>
        <div className="col s4">
          <Panel color="teal" title="NET" value={<span><sup>$</sup>{goal.net}</span>}/>
        </div>
      </div>
       );
    })}



        {/* {this.state.goals.map(goal => {
                  return (
                    <div className="col s6">
                    <List>
                       {goal.name}
                    <ListItem key={goal.name}>
                          Budget: {goal.budget}
                    </ListItem>
                    <ListItem>Spent: {goal.spent} </ListItem>
                    <ListItem>Net: {goal.net}</ListItem>
                    </List>
                    </div>
                  );
                })} */}
>>>>>>> 2c257e8e4c3b36b3e0b0c0043e8fb73e2a17176c

         <GigSummary />
         <ExpenseSummary />

<<<<<<< HEAD
                </div>   
 
                <div className="col s12 m7 l8">
               
                <GoalSummary />

              <TransactionSummary />
   

              </div>
          </div> 
           
           
=======





          <div className="row">
              <div className="col s12">
              <div className="divider"></div>
            <h4>{this.state.gig.gigName} Transactions</h4>


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






>>>>>>> 2c257e8e4c3b36b3e0b0c0043e8fb73e2a17176c
            </Container>

        );
    }

}

<<<<<<< HEAD




export default GigDetail;
=======
export default GigDetail;
>>>>>>> 2c257e8e4c3b36b3e0b0c0043e8fb73e2a17176c
