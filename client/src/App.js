import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { Nav, Breadcrumbs } from "./components/Nav";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Callback from './components/Callback';
import { requireAuth } from './utils/AuthService';
import history from './utils/history';
import GigDetail from "./pages/GigDetail";
import ActionButton from './components/ActionButton';
import { AccountsHome, AccountDetail } from './pages/Accounts';
import { ModalAddAccount, ModalAddGig, ModalAddGoal } from './components/Modals';
import API from "./utils/API";


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        user: {}
    }

    this.GigDetailPage = (props) => <GigDetail
          getUser={this.getUser.bind(this)}
          user={this.state.user}
          {...props}
        />
  }

  getUser(){
    API.getUser()
      .then(user => {
        console.log("we got a user")
        let userData = user.data;
        this.setState({user: userData})
      })
      .catch(err => {
        console.log("we got a err")
        console.log(err)
      })
  }


  canI(){
    alert("can i do this?")
  }

  componentWillMount() {
    this.getUser()
  }

  render() { return <Router history={history}>
    <div>
      <Nav />
      <Breadcrumbs/>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={() => <Dashboard user={this.state.user || {}}/>} onEnter={requireAuth}/>
        <Route exact path="/gigs/:id" component={this.GigDetailPage} user={this.state.user || {}} onEnter={requireAuth} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/accounts" component={AccountsHome} onEnter={requireAuth} />c
        <Route exact path="/accounts/:id" component={AccountDetail} onEnter={requireAuth}  />
        <Route path="/callback" component={Callback} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
      <Footer />
      <Sidebar />
      <ActionButton location={history.location}/>
      {/* Modals */}
      <ModalAddAccount/>
      <ModalAddGoal/>
      <ModalAddGig />
    </div>
  </Router>;
  }

}

export default App
