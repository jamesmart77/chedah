import React from "react";
import { formatCurrencyValueJSX, formatChangeValueJSX } from '../../utils/currency';
import {Modal, Button, Row, Input} from 'react-materialize';
import { Multiselect } from '../Multiselect'
import API from '../../utils/API'


// materialize gig preview
/*

    goals : []
    moneyIn : 6554.860000000001
    moneyOut : 41902.88000000005
    name : "Personal"
    net :-35348.02000000005
    spendingByCategory : []

*/
class Gig extends React.Component {
    constructor(props) {
        super(props);
        console.log(`gig props: `, props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {

        }
    }

    deleteGig(gigId) {
      API.deleteGig(gigId) 
        .then(res => this.props.refresh())
        .catch(err => console.log('err', err))
    }

    editGig () {
      const data = {}
  
      data.gigId = this.props._id
      data.name = this.props.name
  
      API.editGig(data).then(res => {
        this.props.refresh()
      }).catch(err => {
        console.log("Gig edit failed")
        console.log(err)
      })
    }


    handleClick(freq) {
        this.setState({frequency: freq})
    }

    render() {
        const gigHref = `/gigs/${this.props._id}`;
        return (
            <div datavalue={this.props._id} className="card">
              <div className="card-content cardHeader">
                <div className="row">
                  <div className="col s10 l11">
                    <span className="card-title">
                      <a className="side-headers" href={gigHref}>
                        <span className="primaryHeaderText">{this.props.name.toLowerCase() !== 'personal'  && ' Gig:' }  </span>
                        <span className="secondaryHeaderText">{this.props.name}</span>
                      </a>
                    </span>
                  </div>
                  <div className ='col s2 l1'>
                  { this.props.name.toLowerCase() !== 'personal' &&
                    <Modal
                        header="Edit Gig"
                        trigger={<a href="!#"><i className="material-icons iconStyleMed">settings</i></a>}
                        actions={
                            <section className="modalSpace">
                            <Button onClick={ () => this.deleteGig(this.props._id) } waves='light' className="modal-action modal-close deep-orange darken-3 white-text" >Delete Gig</Button> <Button onClick={this.editGig.bind(this)} waves='light' className="modal-action modal-close teal" >Update Gig</Button> 
                            </section>
                          }>
                          
                          <div className='col input-field s12'>
                            <input className='input-field' onChange={this.handleChange} type='text' name='name' id='input_1' defaultValue={ this.props.name } />
                            <label className='active' htmlFor='input_1'> Gig Name </label>
                          </div>
                        
                          <div className='col input-field s12'>
                            <input className='input-field' onChange={this.handleChange} type='number' name='budget' id='input_2' defaultValue={ this.props.budget } />
                            <label className='active' htmlFor='input_2'> Gig Description </label>
                          </div>

                          {/* Might pull this out of MVP, it's the account association */}
                          {/* <div className='col input-field s12'>
                            <input className='input-field' onChange={this.handleChange} type='number' name='budget' id='input_2' defaultValue={ this.props.budget } />
                            <label className='active' htmlFor='input_2'> Account Association </label>
                          </div> */}

                        <br/>
                        <br/>
                        <br/>
                      
                        </Modal> }
                  </div>
                </div>

              </div>
              <div className="card-content cardBody">
                <div className="row">
                  <div className="col m12 l4">
                    <div className="row">
                      <div className="col">
                        <span className="gig-dash-subtitle">In</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.moneyIn)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col m12 l4">
                    <div className="row">
                      <div className="col">
                        <span className="gig-dash-subtitle">Expenses</span>
                      </div>
                    </div>
                    <div className="row">
                      <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.moneyOut)}</span>
                    </div>
                  </div>

                  {/* Net */}
                  <div className="col m12 l4">
                    <div className="row">
                      <div className="col">
                        <span className="gig-dash-subtitle">Net</span>
                      </div>
                    </div>
                    <div className="row">
                      <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.net)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                  {/* <ModalAddGoal id={this.props._id}/> */}
              </div>
            </div>

        );
    }
};


export default Gig;
