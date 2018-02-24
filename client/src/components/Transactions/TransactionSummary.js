import React, { Component } from "react";
import Transaction from './Transaction';


class TransactionSummary extends Component {

    state = {
        gig: { 
            gigName: "Uber",  
          },
         transactions: [
            {
              id: 1,
              date: "11/23/14", 
              vendor: "Google", 
              category: "Advertising", 
              gig: "Uber",
              amount: 200.00
            },
            {
              id: 2,
              date: "11/23/14", 
              vendor: "Staples", 
              category: "Office Supplies", 
              gig: "Uber",
              amount: 15.00
            },
            {
              id: 3,
              date: "11/23/14", 
              vendor: "Staples", 
              category: "Office Supplies", 
              gig: "Dev",
              amount: 12.00
            },
            {
              id: 4,
              date: "11/23/14", 
              vendor: "Staples", 
              category: "Office Supplies", 
              gig: "Uber",
              amount: 16.00
            },
            {
              id: 5,
              date: "11/23/14", 
              vendor: "Staples", 
              category: "Office Supplies",
              gig: "Dev", 
              amount: 119.00
            },
            {
              id: 6,
              date: "11/23/14", 
              vendor: "Staples", 
              category: "Office Supplies", 
              gig: "Dev",
              amount: 219.00
            },
            {
              id: 7,
              date: "11/23/14", 
              vendor: "Staples", 
              category: "Office Supplies", 
              gig: "Uber",
              amount: 29.00
            }
          ]
    };


    

    render() {
        return (
            <div className="card">
            <div className="card-content cardHeader">
                <div className="row">
                    <div className="col s12">
                        <span className="card-title"><span className="primaryHeaderText">Transactions: </span> <span className="secondaryHeaderText">{this.state.gig.gigName}</span></span>
                    </div>
                    
                </div>
    
             </div>
             <div className="card-content cardBody">
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
                        
                       
                {this.state.transactions.map((transaction) => (
                    <Transaction
                       
                        date={transaction.date}
                        vendor={transaction.vendor}
                        category={transaction.category}
                        gig={transaction.gig}
                        amount={transaction.amount}
                       
                    />
                ))}
           
                        
                     
                        </tbody>
                      </table>
    
                
                    </div>
    
                  </div>
                  </div>
                  </div>
           

        );
    }
}


export default TransactionSummary;
