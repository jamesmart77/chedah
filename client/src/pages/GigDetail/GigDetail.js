import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Panel from "../../components/Panel";
import { List, ListItem } from "../../components/List";
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
            { name:"Another Goal Here", budget: 200, spent: 100, net: 100 },
            
        ]
      };


    render() {
        return (
            <Container fluid>
             <div className="row">
              <div className="col s12">
            <h1>{this.state.gig.gigName}</h1>
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
            <div style={{clear: 'both'}} className="row">
        
        
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


 <div style={{clear: 'both'}} className="row">
        <div className="col s6">
        <Panel color="teal" title="GOAL NAME" value="Budget | Spent | Net"/>
        </div>
        <div className="col s6">
        <Panel color="teal" title="GOAL NAME" value="Budget | Spent | Net"/>
        </div>
             
        
      

          <div className="row">
              <div className="col s12">
              <div className="divider"></div>
            <h4>{this.state.gig.gigName} Transactions</h4>
            <p> transactions here</p>
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