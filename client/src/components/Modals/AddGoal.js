import React, { Component } from 'react';
import API from '../../utils/API';


// add goal modal
class ModalAddGoal extends Component {

    constructor(props) {
        super(props);
        console.log(`Modal: `, props);
    }

    componentWillMount() {
        API.getGigData(this.props.gigId).then(gigData => {
            this.setState(gigData)
            console.log(`-> ModalAddGoal: `, gigData);
        }).catch(console.log)
    }

    addGoalToGig(){
        const data = {}

        data.gigId = this.props.gigId
        data.goal = {}

        API.addGoalToGig(data)
            .then(res => {
                this.loadGig();
            })
        .catch(err => {
            alert('what happened?')
        })
    }

    render() {
        return (
          <div id="add-goal-modal" className="modal" data-modal>
            <div className="modal-content">
              <h4>Add a Goal</h4>
              <div className="col input-field s12">
                <input type="text" name="goalName" id="input_1" defaultValue={this.props.goalName} />
                <label className="active" htmlFor="input_1">Goal Name</label>
              </div>
              <div className="col input-field s12">
                <input type="text" name="goalBudget" id="input_2" defaultValue={this.props.budget} />
                <label className="active" htmlFor="input_2">Budget</label>
              </div>
              <p>Select Expense Categories To Track:</p>
              {/* Categories */}
              <div className="row" />
            </div>
            <div className="modal-footer">
              <section>
                <button className="btn waves-effect waves-light btn-flat modal-action modal-close deep-orange darken-3 white-text">Cancel</button>
                &nbsp;
                <button onClick={() => this.addGoalToGig(this.props.gigId)} className="btn waves-effect waves-light modal-action modal-close teal">Apply</button>
              </section>
            </div>
          </div>
      );
    }
}

export default ModalAddGoal;
