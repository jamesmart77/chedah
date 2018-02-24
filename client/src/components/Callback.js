import { Component } from 'react';
import { setIdToken, setAccessToken } from '../utils/AuthService';
import API from '../utils/API';

/*
Once a user is authenticated, Auth0 will redirect back to our application and call the /callback route. Auth0 will also append the id_token as well as the access_token to this request, and our Callback component will make sure to properly process and store those tokens in localStorage. If all is well, meaning we received an id_token, and access_token, we will be redirected back to the / page and will be in a logged-in state.
*/

class Callback extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();

    API.createUserIfDoesNotExist()
    .then(res => {

      console.log("WTF Happaned")
      console.log(res.data);
      res.data.userExist ? window.location.href = "/dashboard" : console.log(res.data)
      
    })
    .catch(console.log);
  }

  render() {
    return null;
  }
}

export default Callback;