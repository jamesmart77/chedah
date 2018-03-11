import React from 'react';
import API from '../../utils/API';


const defaultCategories = [
    {
        id: '9DF0A0DD19B2',
        name: 'Travel'
    }, {
        id: 'DCCBD8F37DA3',
        name: 'Tolls'
    }, {
        id: 'D2AA8A93CA76',
        name: 'Gas'
    }, {
        id: 'C86EE76D90B4',
        name: 'Gas'
    }
]


// add goal modal
class ModalEditGoal extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        API.getGigData(this.props.gigId).then(gigData => {
            this.setState(gigData)
            // console.log(`-> ModalAddGoal: `, gigData);
        }).catch(console.log)
    }

    addGoalToGig() {
        const data = {}

        data.gigId = this.props.gigId
        data.goal = {}

        API.addGoalToGig(data).then(res => {
            this.loadGig();
        }).catch(err => {
            alert('what happened?')
        })
    }

    handleClick(val) {
        console.log(`selected: `, val);
    }

    render() {
        const listItems = defaultCategories.map((item, i) =>
            <option key={item.id}>{item.name}</option>
        )

        return (
            <div id="add-goal-modal" className="modal" data-modal="data-modal" style={{minHeight: '60%'}}>
            <div className="modal-content">
                <div className="modal-title">
                    <h4>Add a Goal</h4>
                </div>
                <div className="col input-field s12">
                    <input type="text" name="goalName" id="input_1" defaultValue={this.props.goalName}/>
                    <label className="active" htmlFor="input_1">Goal Name</label>
                </div>
                <div className="col input-field s12">
                    <input type="text" name="goalBudget" id="input_2" defaultValue={this.props.budget}/>
                    <label className="active" htmlFor="input_2">Budget</label>
                </div>
                <div className="row">
                    <span>Select Expense Categories To Track:</span>
                </div>
                <div className="row">
                    <div className="col s6">
                        <select onClick={this.handleClick} multiple="multiple">
                            {listItems}
                        </select>
                    </div>
                    <div className="col s6"></div>
                </div>
                <div className="modal-footer">
                    <section>
                        <button className="btn waves-effect waves-light btn-flat modal-action modal-close deep-orange darken-3 white-text">Cancel</button>
                        &nbsp;
                        <button onClick={() => this.addGoalToGig(this.props.gigId)} className="btn waves-effect waves-light modal-action modal-close teal">Apply</button>
                    </section>
                </div>
            </div>
        </div>
        );
    }
}

export default ModalEditGoal;
