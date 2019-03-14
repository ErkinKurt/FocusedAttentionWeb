import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class LoginForm extends Component {
    redirectToRegister = () => {
        this.props.history.push("/register");
    }
    render() {
        return (  
        <MDBContainer>
            <MDBRow className = "d-flex justify-content-center mt-5">
            <MDBCol md="6">
                <form>
                <p className="h5 text-center mb-4">FOCUSSED ATTENTION DISORDER</p>
                <p className="h5 text-center mb-4">Login</p>
                <div className="grey-text">
                    <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    />
                    <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    />
                </div>
                <div className="text-center">
                    <MDBBtn>Login</MDBBtn>
                    <MDBBtn color="danger" onClick={this.redirectToRegister}>Register</MDBBtn>
                </div>
                </form>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        );
    }
}
  
  export default LoginForm;
