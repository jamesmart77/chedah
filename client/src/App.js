import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Callback from './components/Callback';
import { requireAuth } from './utils/AuthService';
import history from './utils/history';
import GigDetail from "./pages/GigDetail";
import ActionButton from './components/ActionButton';
import { AccountsHome, AccountDetail } from './pages/Accounts';
import API from "./utils/API";


class App extends React.Component {

  state = {
    user: {}
  }

  getUser(){
    API.getUser()
      .then(user => {
        console.log("we got a user")
        console.log(user)
        this.setState({user: user.data})
      })
      .catch(err => {
        console.log("we got a err")
        console.log(err)
      })
  }

  GigDetailPage = (props) => <GigDetail
        getUser={this.getUser.bind(this)}
        user={this.state.user}
        {...props}
      />
    
  

  canI(){
    alert("can i do this?")
  }

  componentDidMount() {
    this.getUser()
  }

  render() { return <Router history={history}>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} onEnter={requireAuth} />
        <Route exact path="/gigs/:id" onEnter={requireAuth} render={this.GigDetailPage}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/accounts" component={AccountsHome} onEnter={requireAuth} />
        <Route exact path="/accounts/:id" component={AccountDetail} onEnter={requireAuth}  />
        <Route path="/callback" component={Callback} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
      <Footer />
      <Sidebar />
      <ActionButton />
    </div>
  </Router>;
  }

}

export default App
