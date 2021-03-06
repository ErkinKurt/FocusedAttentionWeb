import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';
import { SignOut } from '../SignOut';
import { AuthUserContext } from '../Session';

const NAVIGATION_STATE = {
  isRedirectedToSignIn: false,
}


// Navigation, when a user signed in to system
class NavigationAuth extends Component {

  constructor(props) {
    super(props);
    this.state = {...NAVIGATION_STATE};
  }

  redirectToSignIn = () => {
    this.setState({
      isRedirectedToSignIn: true
    });
  }

  render() {
    let {isRedirectedToSignIn} = this.state;
    if (isRedirectedToSignIn) {
      return(
        <Redirect to={ROUTES.SIGN_IN} />
      )
    }
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
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li className="navbar-li">
          <Link to={ROUTES.DOCTOR}>Doctor</Link>
        </li>
        <li className="navbar-li">
          <Link to={ROUTES.PATIENT}>Patient</Link>
        </li>
        <li className="navbar-li">
          <FirebaseContext.Consumer>
            {firebase => <SignOut firebase={firebase} onClick={this.redirectToSignIn}/>}
          </FirebaseContext.Consumer>
        </li>
      </ul>
    );
  }
};

// Navigation, when a user not signed in to system
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
        {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
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