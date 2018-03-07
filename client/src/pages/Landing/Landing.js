import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Button } from 'react-materialize';

class Landing extends Component {


  render() {
    return (
      <div>
        <div className="row header">
        <div className="col s12">
          <h1 className="headerTitle">Chedah</h1>
          <h4 className="headerTitle">TagLine Goes Here. TagLine Goes Here</h4>
          {/* <Button className="teal" waves='light'>Sign Up</Button> */}
          <h6 className="headerTitle">Sign Up / Sign In</h6>
        </div>
        </div>
       

          <div className="row header2">

            <div className="col s12 m4">
            <img className="landingImg" src='https://placehold.it/250x250//cccccc' alt=''/>
              <h6>Promo Content goes here</h6>
            </div>
            <div className="col s12 m4">
            <img className="landingImg" src='https://placehold.it/250x250//cccccc' alt=''/>
            <h6>Promo Content goes here</h6>
            </div>
            <div className="col s12 m4">
            <img className="landingImg" src='https://placehold.it/250x250//cccccc' alt=''/>
            <h6>Promo Content goes here</h6>
            </div>
        </div>

        <div className="row header valign-wrapper">
          <div className="col s12">
              <h6 className="headerTitle">Parallaxy Thing</h6>
          </div>
        </div>

        <div className="row header2">

          <div className="col s12 m6">
          <img className="landingImg" src='https://placehold.it/450x250//cccccc' alt=''/>
          </div>
          <div className="col s12 m6">
          <h4>Promo Content goes here</h4>
          <ul className="landingList">
            <li><h5><i className="material-icons">check_circle</i>A Thing</h5></li>
            <li><h5><i className="material-icons">check_circle</i>Another Thing</h5></li>
            <li><h5><i className="material-icons">check_circle</i>A New Nother Thing</h5></li>
            </ul>
          </div>
          <div className="col s12">
          <h4>Pull Quote About Money</h4>
          </div>
        </div>


      </div>

       

    );
  }
}

export default Landing;
