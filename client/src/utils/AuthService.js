import decode from 'jwt-decode';
import auth0 from 'auth0-js';
import history from './history';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'k4Qfo5pZUT8bxBa0V4vRmRoaD26Y124G';
const CLIENT_DOMAIN = 'chedah.auth0.com';
const REDIRECT = window.location.hostname === 'chedah.herokuapp.com' ? 'https://'+ window.location.hostname + '/callback' : 'localhost:3000/callback'
const SCOPE = 'openid email openid profile allAPI';
const AUDIENCE = 'https://chedah.herokuapp.com'; // react is complaining on this not being used, commenting out for now, might deprecate

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  history.push('/');

  //remove this once landing page state is being watched
  window.location.href = "/"
}

export function getIdToken() {
  // error here
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isIdAndAccessSet(){
  const idToken = getIdToken();
  const accessToken = getAccessToken();

  //!! will force returning true or false, not null
  return !!idToken && !!accessToken
}
export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  console.log(`getting expiration`);
  const token = decode(encodedToken);

  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

export function decodeToken(encodedToken) {
  return decode(encodedToken);
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}