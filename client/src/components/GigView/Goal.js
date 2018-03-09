import React from "react";
import "./GigView.css";
import {formatCurrencyValueJSX} from '../../utils/currency';
import {Modal, Button, Row, Input} from 'react-materialize';

const Goal = props => (


<div className="card">
<div className="card-content cardHeader">
<div className="row">
    <div className="col s11">
        <span className="card-title"><span className="primaryHeaderText">Goal:</span> <span className="secondaryHeaderText">{props.name}</span></span>
    </div>
    <div className="col s1">
    <Modal
        header='Edit A Goal'
        actions={
            <section>
              <Button waves='light' flat className="modal-action modal-close deep-orange darken-3 white-text">Cancel</Button> &nbsp;
              <Button waves='light' className="modal-action modal-close teal" onClick={()=>props.editGoal(props.id)} >Apply</Button>
            </section>
          }
         trigger={<a href="#!" onClick={ () => props.editGoal(props.id)}><i className="material-icons iconStyleMed">settings</i></a>}>
         <Input s={12} label="Goal Name" defaultValue={props.name} name="goalName" />
         <Input s={12} label="Budget" defaultValue={props.budget} name="budget" />
         <p>Select Expense Categories To Track:</p>
         <Row>
            <Input name='group1' type='checkbox' value='red' label='Red' className='filled-in'/>
            <Input name='group1' type='checkbox' value='yellow' label='Yellow' className='filled-in' />
            <Input name='group1' type='checkbox' value='green' label='Green' className='filled-in' />
            <Input name='group1' type='checkbox' value='brown' label='Brown'  className='filled-in'/>
        </Row>
    </Modal>
</div>

</div>
<div className="card-content cardBody">
<div className="row">
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Budget</span>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <span className="gig-dash-total">{formatCurrencyValueJSX(props.budget)}</span>
            </div>
        </div>
    </div>

  
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Expenses</span>
            </div>
        </div>
        <div className="row">
            <span className="gig-dash-total">{formatCurrencyValueJSX(props.spent)}</span>
        </div>
    </div>

    {/* Net */}
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Net</span>
            </div>
        </div>
        <div className="row">
            <span className="gig-dash-total">{formatCurrencyValueJSX(props.net)}</span>
        </div>
    </div>
</div>
</div>
</div>
</div>

);


export default Goal;