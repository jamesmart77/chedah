import React, {Component} from 'react';
import { formatCurrencyValueJSX } from '../../utils/currency';
import { Doughnut } from 'react-chartjs-2';

//  default options & data
const chartData = {
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

  labels: ['Advertising', 'Office Supplies', 'Promotion']
};


// http://www.chartjs.org/docs/latest/configuration/
const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  title: {
	fontFamily: 'Scope One',
	fontSize: 18,
	fontStyle: 'bold',
	display: true
  },
  legend: {
	position: 'bottom'
  },
  animation: {
	animateRotate: true
  },
  layout: {
	padding: {
	  top: 0
	}
  }
}


class ExpenseChart extends Component {

	constructor(props) {
        super(props);
    };

	getExpensesTotal() {
		return this.props.expenses.reduce((total, item) => {
			total += item.sum;
			return total;
		}, 0);
	}

    // create the detail table (other side of the chart card)
	renderDetail() {
		let listItems =
			this.props.expenses.map((item, i) =>
				<li key={i} className="collection-item">{item.category}
		  			<span className="right">{formatCurrencyValueJSX(item.sum)}</span>
				</li>
			)

		// push the total to the bottom of the stack
		listItems.push(<li key={this.props.expenses.length} className="collection-item"><b>Total:</b><span className="right"><b>{formatCurrencyValueJSX(this.getExpensesTotal())}</b></span></li>)
		return listItems;
	};

    // render the component
	render() {
		chartOptions.title.text = this.props.gigName + ' Expenses: $' + this.getExpensesTotal()
		chartData.labels = this.props.expenses.map(e => e.category)
		chartData.datasets = [{label: 'Expense Breakdown', data: this.props.expenses.map(e => e.sum), backgroundColor: ['#ff6f00', '#ffa040', '#c43e00']}]
		const details = this.renderDetail();
		return (
			<div className='expense-summary card'>
				<div className="card-content">
					<span className="card-title activator grey-text text-darken-4">
						<i className="material-icons right md-18">more_vert</i>

						  {/* Chart Component */}
						  <Doughnut
							  height='300'
							  data={chartData}
							  options={chartOptions}
						  />
					</span>
				</div>

				<div className="card-reveal">
					<span className="card-title grey-text text-darken-4">{this.props.gigName + " Expenses"}<i className="material-icons right md-18">close</i></span>
					{details}
				</div>
			</div>
		);
	};
};


export default ExpenseChart;
