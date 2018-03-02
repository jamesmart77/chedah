import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

var chartData = {
  borderWidth: 1,
  datasets: [
    {
      label: 'Expense Breakdown',
      data: [
        825.00, 200.00, 500
      ],
      backgroundColor: ['#ff6f00', '#ffa040', '#c43e00']
    }
  ],

  labels: ['Repair', 'Food', 'Promotion']
};


class ExpenseChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expenses: props.expenses || [],
      data: props.data,
      options: props.options
    };
    console.log(`props:`);
    console.log(props);
  };

  render() {
    return (
        <div className='expense-summary card'>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">Expense Detail<i class="material-icons right">more_vert</i></span>
                <canvas id="expenses-chart"></canvas>
            </div>

            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">Expense Details<i class="material-icons right">close</i></span>
            </div>
        </div>
    );
  }
};

export default ExpenseChart;
