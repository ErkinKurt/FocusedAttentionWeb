import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Navigation extends Component {
  render() {
    return (
      <div>
        <ul className="navbar-ul">
          <li className="navbar-li">
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li className="navbar-li">
            <Link to={ROUTES.SIGN_IN}>Sign in</Link>
          </li>
          <li className="navbar-li">
            <Link to={ROUTES.SIGN_UP}>Sign up</Link>
          </li>
          <li className="navbar-li">
            <Link to={ROUTES.LANDING}>Landing</Link>
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
        </ul>
      </div>
    );
  }
}

export default Navigation;