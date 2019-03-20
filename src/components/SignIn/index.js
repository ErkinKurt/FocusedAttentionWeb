import React, { Component } from 'react';
import LoginForm from '../UIElements/Login/LoginForm';
import { FirebaseContext } from '../Firebase';

class SignIn extends Component {
  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => <LoginForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    );
  }
}

export default SignIn;