import React from "react";
import { Toast } from 'react-materialize'
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { Nav, Breadcrumbs } from "./components/Nav";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
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
      .then(user => this.setState({user: user.data}))
      .catch(err => {
        console.log('error getting the user in the app.js file')
        console.log(err)
      })
  }


  GigDetailPage = (props) => <GigDetail
      getUser={this.getUser.bind(this)}
      user={this.state.user || {}}
      location={history.location}
      {...props}
    />

    componentWillMount() {
      
      this.getUser()
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
                      <Route exact path="/dashboard" component={() => <Dashboard user={this.state.user || {} }/>}/>
                      <Route exact path="/gigs/:id" component={this.GigDetailPage} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/accounts" component={() => <AccountsHome user={this.state.user || {} }/>} />
                      <Route exact path="/accounts/:id" component={AccountDetail} />
                  </Switch>
              )
          } else {
            // window.location.href = "/"
          }
        })()}
      </Switch>
      <Footer />
      <Sidebar />
      {/* <ActionButton location={history.location}/> */}
      {history.location.pathname !== '/' && <ActionButton location={history.location}/> }
      {/* Modals */}
      <ModalEditAccount user={this.state.user}/>
      {/* <ModalAddGoal user={this.state.user}/> */}
      <ModalAddGig user={this.state.user}/>
      <ModalAddCategory user={this.state.user}/>
    </div>
  </Router>;
  }

}

export default App
