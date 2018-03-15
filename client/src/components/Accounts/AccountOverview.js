import React from 'react';
// import CreditCardAPR from './APR'
// import  HeaderMenu from '../Dash/HeaderMenu';
import { Modal, Button, Row, Input } from 'react-materialize';
import API from '../../utils/API'


// account preview component (for accounts home)
class AccountOverview extends React.Component {

    constructor(props) {
        super(props)
    }


    handleChange = event=> {
        this.setState({[event.target.name]: event.target.value})
      }

    deleteAccount(accountId) {
        API.deleteAccount(accountId)
        .then(res => window.location.reload())
        //   .then(res => this.props.refresh())
          .catch(err => console.log('err', err))
      }


      updateAccount () {
        const data = {}
    
        data._id = this.props.account._id
        this.state.name ? data.name = this.state.name : null
        this.state.gigId ? data.defaultGigId = this.state.gigId : null
    
        API.updateAccount(data)
        .then(res => window.location.reload())
        .catch(err => {
          console.log("Account edit failed")
          console.log(err)
        })
      }

      getGigList(gigs) {
        let gigList = [<option key={0} disabled>None</option>]
       gigs.forEach(gig =>{
            gigList.push(<option value={gig._id} key={gig._id}>{gig.name}</option>)
        });
        return gigList
    }


    render() {
        // build list of gigs
        const gigs = this.props.user.gigs || []
        const gigItems = this.getGigList(gigs)
        // const iconName = (this.props.account.type === 'credit') ? 'credit_card' : 'attach_money'
        const iconName = (this.props.account.type == 'credit') ? 'icon-credit-card-1' : 'icon-banknote'
        const listItems = [{id: 1, name: 'edit account'}, {id: 2, name: 'add gig'}, {id: 3, name: 'remove account'}]
        return (
            <div key={this.props.account._id} className="card account-view-card">
                <div className="card-content">
                    <div className="row valign-wrapper">
                        <div className="col s11 l11">
                        
                            <span className="card-title">
                                <span className={iconName}></span>
                                <a href={'/accounts/' + this.props.account.account_id}>  {this.props.account.name}</a>
                                
                            </span>
                        </div>
                        <div className="col s1 l1 right">
                     <Modal
                        header="Edit Account"
                        trigger={<a href="!#"><i className="material-icons iconStyleMed">settings</i></a>}
                        actions={
                            <section className="modalSpace">
                            <Button  onClick={ () => this.deleteAccount(this.props.account.account_id) } waves='light' className="modal-action modal-close deep-orange darken-3 white-text" >Delete Account</Button> <Button onClick={this.updateAccount.bind(this)} waves='light' className="modal-action modal-close teal" >Update Account</Button> 
                            </section>
                          }>

                          <div className='col input-field s12'>
                            <input className='input-field' onChange={this.handleChange} type='text' name='name' id='input_1' defaultValue={ this.props.account.name } />
                            <label className='active' htmlFor='input_1'> Account Name </label>
                          </div>

                            {/* Gigs */}
                     <div className="row">
                       <div className="input-field col s6">
                         <Input s={12} type='select' id="input-gig-account" label={"Current Gig: " + this.props.account.defaultGigName} defaultValue="None" onChange={this.handleChange} name="gigId">
                           {gigItems}
                         </Input>
                       </div>
                     </div>

                            <br/>
                            <br/>
                            <br/>

                        </Modal> 
                    </div>
                </div>
                </div>
                </div>
        )
    }
}

export default AccountOverview;
