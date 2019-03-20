import React, { Component } from 'react';
import {MDBBtn} from 'mdbreact';

export class SignOut extends Component{
  render(){
    return(
      <MDBBtn color="danger" onClick={this.props.firebase.doSignOut}>SignOut</MDBBtn>
    );
  }
}

export default SignOut;