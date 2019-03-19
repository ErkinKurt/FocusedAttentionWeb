import React, { Component } from 'react';
import RegisterForm from '../UIElements/Register/RegisterForm';
import { FirebaseContext } from '../Firebase';

class SignUp extends Component {
  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => <RegisterForm firebase={firebase}/>}
      </FirebaseContext.Consumer>
    );
  }
}

export default SignUp;