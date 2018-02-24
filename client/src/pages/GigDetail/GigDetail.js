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
            { name:"Another Goal Goes Here", budget: 425, spent: 300, net: 125 },            
        ]
      };


    render() {
        return (
            <Container fluid>
              <div className="row">
                  <div className="col s12">
                      <h4 className='dash-title'>{this.state.gig.gigName}</h4>
                  </div>
              </div>
      
              <div className="row">
                <div className="col s12 m5 l4">
                <Panel color="blue-grey darken-4" title="MONEY IN" value={<span><sup>$</sup>{this.state.gig.moneyIn}</span>}/> 
                  <Panel color="blue-grey darken-4" title="MONEY OUT" value={<span><sup>$</sup>{this.state.gig.moneyOut}</span>}/>
                  <Panel color="blue-grey darken-4" title="NET" value={<span><sup>$</sup>{this.state.gig.net}</span>}/>
                </div>
    
 
                <div className="col s12 m7 l8">
                  <div className="divider"></div>
                  <h4 className='dash-title'>{this.state.gig.gigName} Goals</h4>
            
                  {this.state.goals.map(goal => {
                    return (
                      <div>
                      <div className="divider"></div>
                      <h5>{goal.name}</h5>
             
                      <Panel color="teal" title="BUDGET" value={<span><sup>$</sup>{goal.budget}</span>}/>
                      <Panel color="teal" title="SPENT" value={<span><sup>$</sup>{goal.spent}</span>}/>
                      <Panel color="teal" title="NET" value={<span><sup>$</sup>{goal.net}</span>}/>
                      </div>
                      );
                  })}
   
      
                  <div className="divider"></div>
                    <h4 className='dash-title'>{this.state.gig.gigName} Transactions</h4>
            
            
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