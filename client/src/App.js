import React from "react";
import { Toast } from 'react-materialize'
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { Nav, Breadcrumbs } from "./components/Nav";
import Footer from "./components/Footer/Footer";
import Callback from './components/Callback';
import { requireAuth, isLoggedIn } from './utils/AuthService';
import history from './utils/history';
import GigDetail from "./pages/GigDetail";
import ActionButton from './components/ActionButton';
import { AccountsHome, AccountDetail } from './pages/Accounts';
import { ModalEditAccount, ModalAddCategory, ModalAddGig, ModalAddGoal } from './components/Modals';
import API from "./utils/API";


class App extends React.Component {

    state = {
        user: {}
    }

  getUser(){
    API.getUser()
      .then(user => {
        this.setState({user: user.data})
      })
      .catch(err => {
        console.log('error getting the user in the app.js file')
        console.log(err)
      })
  }

  refresh(){
    this.getUser()
  }


  GigDetailPage = (props) => <GigDetail
      getUser={this.getUser.bind(this)}
      user={this.state.user || {}}
      location={history.location}
      refresh={ this.refresh.bind(this) }
      {...props}
    />

    componentWillMount() {
       isLoggedIn() ? this.getUser() : null // don't do this unless the user is logged in
  }

  render() { return <Router history={history}>
    <div>
      { this.state.error && <h1 className='error'>{ this.state.error }</h1> }
      <Nav user={this.state.user} />
      {/* <Breadcrumbs location={history.location}/> */}
      {history.location.pathname !== '/' && <Breadcrumbs location={history.location}/> }
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/callback" component={Callback} />
        {(() => {
          if (isLoggedIn()) {
              return (
                  <Switch>
                      <Route exact path="/dashboard" component={() => <Dashboard refresh={ this.refresh.bind(this) } user={this.state.user || {} }/>}/>
                      <Route exact path="/gigs/:id" component={this.GigDetailPage} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/accounts" component={() => <AccountsHome user={this.state.user || {} }/>} />
                      <Route exact path="/accounts/:id" component={AccountDetail} />
                  </Switch>
              )
          }
        })()}
      </Switch>
      <Footer />
      {/* <ActionButton location={history.location}/> */}
      {history.location.pathname !== '/' && <ActionButton location={history.location}/> }
      {/* Modals */}
      {/* We don't want these modals loaded into the DOM unless the user is logged in, the reason for this is because they attempt to query the backend and can crash the progra without a token */}
      {isLoggedIn() && <div>
      <ModalEditAccount user={this.state.user}/>
      <ModalAddGoal user={ this.state.user } location={ history.location } refresh={ this.refresh.bind(this) } />
      <ModalAddGig user={this.state.user} refresh={ this.refresh.bind(this) }/>
      <ModalAddCategory user={this.state.user}/>
      </div>
      }
    </div>
  </Router>;
  }

}

export default App
