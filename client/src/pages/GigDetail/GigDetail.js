import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Panel from "../../components/Panel";
import { List, ListItem } from "../../components/List";
import { Card } from 'react-materialize';
import API from "../../utils/API";
import GigSummary from '../../components/GigView/GigSummary';
import ExpenseSummary from '../../components/GigView/ExpenseSummary';
import GoalSummary from '../../components/GigView/GoalSummary';
import TransactionSummary from '../../components/Transactions/TransactionSummary';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

class GigDetail extends React.Component {
    state = {
        gigName: "",
        gigId: this.props.match.params.id,
        time: ['2018-02-01', '2018-02-28'],
        gigSummary: {
            moneyIn: 0.00,
            expenses: 0.00,
            net: 0.00    
        },
        expenseSummary: [],
        transactions: [],
        grid: {
            columns: [
                { key: 'id', name: 'ID' },
                { key: 'date', name: 'Date' },
                { 
                    key: 'vendor', 
                    name: 'Vendor',
                    editable: true
                },
                { key: 'category', name: 'Category' }, 
                { key: 'gig', name: 'Gig' }, 
                { key: 'amount', name: 'Amount' } 
            ]
        },
        goals: []   
      };

      //////////////////////////////////

      // need budget goal gig
      addGoalToGig(){

    }

    editGoal(id){
      alert(id);
    }

    editTransaction(){
        // edit vendor name, category?, gig
    }

    getCurrentMonth(){
        // show 1 month view on gig detail pg
    }

    // TRANSACTIONS
    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
      let rows = this.state.transactions.slice();
  
      for (let i = fromRow; i <= toRow; i++) {
        let rowToUpdate = rows[i];
        let updatedRow = update(rowToUpdate, {$merge: updated});
        rows[i] = updatedRow;
      }
  
      // Update the db here if successful
      this.setState({ transactions: rows });
      //else re rerender
    };

    // Initial Load w/ gigID passed along
    loadGig(gigId){
        API.loadGig(gigId)
          .then(gigInfo => {
              this.setState(gigInfo)
          })
          .catch(console.log)

      //   {
      //       name: "",
      //       transactions: [],
      //       goals: []
      //   }
    }

    componentDidMount(){
        this.getCurrentMonth();
        this.loadGig(this.state.gigId);
    }





    render() {
        return (
            <Container fluid>
              <div className="row">
                  <div className="col s6">
                      <h4 className='dash-title'>{this.state.gigName} Dashboard</h4>
                  </div>
                  
                  <div className="col s6">
                  <h6 className="right"><a href="" className="grey-text">Add An {this.state.gigName} Goal<i className="material-icons iconStyleMed">add_circle</i></a></h6>
                  </div>
                  
              </div>
      
              <div className="row">
                <div className="col s12 m5 l4">

               <GigSummary gigSummary={this.state.gigSummary} addGoalToGig={this.addGoalToGig.bind(this)} />
               <ExpenseSummary expenseSummary={this.state.expenseSummary} />


                </div>   
 
                <div className="col s12 m7 l8">
               
                <GoalSummary goals={this.state.goals} editGoal={this.editGoal.bind(this)}/>

                <TransactionSummary columns={this.state.grid.columns} data={this.state.transactions} handleGridRowsUpdated={this.handleGridRowsUpdated}/>

   

              </div>
          </div> 
           
           
            </Container>

        );
    }

}





export default GigDetail;
