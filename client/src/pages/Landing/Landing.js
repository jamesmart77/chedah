import React, { Component } from "react";
import { login, isLoggedIn } from '../../utils/AuthService';
import { Button } from 'react-materialize';

class Landing extends Component {


  render() {
    return (
      <div>
        <div className="row header vignette">
        <div className="col s12">
          <div className="titleHead">simple money management <br/> for the gig economy</div>
          <div className='center-align'>
          <Button className="teal signUpButton" waves='light' href="#!" onClick={() => login()}>Sign Up Now</Button>
          </div>
        </div>
        </div>
       
          <div className="row">

            <div className="col s12 m4 landingImg">
            <img className="productIMG" src='../../assets/img/product1.svg' alt=''/>
              <h6 className="productTitle">One dashboard</h6>
              <h6 className="productText">Easily sync all your financial accounts in one place. Keep a top level view of your money.</h6>
            </div>
            <div className="col s12 m4 landingImg">
            <img className="productIMG" src='../../assets/img/product2.svg' alt=''/>
            <h6 className="productTitle">Track Your Gigs </h6>
            <h6 className="productText">Break out all of your expenses and income for each gig and project in your pipeline.</h6>
            </div>
            <div className="col s12 m4 landingImg">
            <img className="productIMG" src='../../assets/img/product3.svg' alt=''/>
            <h6 className="productTitle">Set Milestones </h6>
            <h6 className="productText">Customize goals and budgets for each gig. Track your most profitable projects. </h6>
            </div>
        </div>


        <div className="row pullquoteblock valign-wrapper vignette">
          <div className="col s12">
          <div className="pullquote">Freelancers contribute an estimated <br/>$715 billion in earnings to our economy </div>
                  </div>
        </div>

        <div className="row header2">
          <div className="col s12 m6">
          <img src='../../assets/img/product4.svg' alt=''/>
          </div>
          <div className="col s12 m6">
          <div className="landingListTitle">
          Chedah<sup>tm</sup> <br/>Keeps track of all your <br/><span className="taggedLine"> gig &amp; project finances</span> <br/>to help you discover your<br/><span className="taggedLine2">most profitable projects</span></div>
          </div>
          </div>
      </div>   

    );
  }
}

export default Landing;
