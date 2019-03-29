import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';
import { SignOut } from '../SignOut';
import { AuthUserContext } from '../Session';

class NavigationAuth extends Component {
  render() {
    return (
      <ul className='navbar-ul'>
        <li className="navbar-li">
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li className="navbar-li">
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li className="navbar-li">
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li className="navbar-li">
          <FirebaseContext.Consumer>
            {firebase => <SignOut firebase={firebase} />}
          </FirebaseContext.Consumer>
        </li>
      </ul>
    );
  }
};

class NavigationNonAuth extends Component {
  render() {
    return (
      <ul className='navbar-ul'>
        <li className="navbar-li">
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li className="navbar-li">
          <Link to={ROUTES.SIGN_IN}>Sign in</Link>
        </li>
        <li className="navbar-li">
          <Link to={ROUTES.SIGN_UP}>Sign up</Link>
        </li>
      </ul>
    );
  }
};

class Navigation extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        <div>
          {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </div>
      </AuthUserContext.Consumer>
      // <div>
      //   <ul className="navbar-ul">
      //     <li className="navbar-li">
      //       <Link to={ROUTES.ADMIN}>Admin</Link>
      //     </li>
      //     <li className="navbar-li">
      //       <Link to={ROUTES.DOCTOR}>Doctor</Link>
      //     </li>
      //     <li className="navbar-li">
      //       <Link to={ROUTES.PATIENT}>Patient</Link>
      //     </li>
      //   </ul>
      // </div>
    );
  }
}

export default Navigation;