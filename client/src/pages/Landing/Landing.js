import React, { Component } from "react";
import { Container } from "../../components/Grid";

class Landing extends Component {


  render() {
    return (
      <div>
        <div className="row header vignette">
        <div className="col s12">
          <div className="titleHead">simple money management <br/> for the gig economy</div>
          <h6 className="headerTitle">track your
freelance gig, your side hustle, all your entreprenuerial endeavors</h6>
          {/* <Button className="teal" waves='light'>Sign Up</Button> */}
          <h6 className="headerTitle">Sign Up / Sign In</h6>
        </div>
        </div>
       

          <div className="row header1">

            <div className="col s12 m4 landingImg1">
            <img src='../../assets/img/product1.png' alt=''/>
              <h6 className="productTitle">One dashboard</h6>
              <h6 className="productText">Easily sync all your financial accounts in one place. Keep a top level view of your money.</h6>
            </div>
            <div className="col s12 m4 landingImg2">
            <img src='../../assets/img/product2.png' alt=''/>
            <h6 className="productTitle">Track Your Gigs </h6>
            <h6 className="productText">Break out all of your expenses and income for each gig and project in your pipeline.</h6>
            </div>
            <div className="col s12 m4 landingImg3">
            <img src='../../assets/img/product3.png' alt=''/>
            <h6 className="productTitle">Set Milestones </h6>
            <h6 className="productText">Customize goals and budgets for each gig. Track your most profitable projects. </h6>
            </div>
        </div>

        <div className="row pullquoteblock valign-wrapper vignette">
          <div className="col s12">
          <div className="pullquote">Freelancers contribute an estimated <br/>$715 billion in earnings to our economy </div>
          <h6 className="headerTitle">Chedah Helps you Keep track of all your gigs and discover what's most profitable</h6>
                  </div>
        </div>

        <div className="row header2">

          <div className="col s12 m5">
          <img src='../../assets/img/product4.png' alt=''/>
          </div>
          <div className="col s12 m7">
          <div className="landingListTitle">Your Finances. Personalized.</div>
          <ul className="landingList">
            <li><h6><i className="material-icons tiny teal-text">check_circle</i> Simple expense and payment tracking for every project you're working on.</h6></li>
            <li><h6><i className="material-icons tiny teal-text">check_circle</i> Capture all the information you need to reveal your most profitable projects.</h6></li>
            <li><h6><i className="material-icons tiny teal-text">check_circle</i> Streamline your workflow with one dashboard to rule them all.</h6></li>
            <li><h6><i className="material-icons tiny teal-text">check_circle</i> Create goals and easily monitor results. </h6></li>
            <li><h6><i className="material-icons tiny teal-text">check_circle</i> Take control of your finances - no complicated accounting software needed. </h6></li>
         
            </ul>
          </div>
          </div>


          {/* <div className="col s12">
          <h4>Pull Quote About Money</h4>
          </div> */}
       


      </div>

       

    );
  }
}

export default Landing;
