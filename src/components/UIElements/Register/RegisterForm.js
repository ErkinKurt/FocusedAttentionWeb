import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';
import { Redirect, withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const REGISTERFORM_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isRedirected: false,
};

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = { ...REGISTERFORM_STATE };
        this.redirectToHomePage = this.redirectToHomePage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit(event) {
        let { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...REGISTERFORM_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    redirectToHomePage = () => {
        this.setState({
            isRedirected: true
        });
    }

    render() {
        let { username, isRedirected, email, passwordOne, passwordTwo, error } = this.state;

        //if page is redirected to home..
        if (isRedirected) {
            return (
                <Redirect to={ROUTES.SIGN_IN} />
            );
        }

        return (
            <MDBContainer>
                <MDBRow className="d-flex justify-content-center mt-5">
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">FOCUSSED ATTENTION DISORDER</p>
                            <p className="h5 text-center mb-4">Sign up</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Your name"
                                    value={username}
                                    name="username"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="Your email"
                                    value={email}
                                    name='email'
                                    icon="envelope"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="Your password"
                                    name='passwordOne'
                                    value={passwordOne}
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="Confirm your password"
                                    value={passwordTwo}
                                    name='passwordTwo'
                                    icon="exclamation-triangle"
                                    group
                                    type="text"
                                    validate
                                    type="password"
                                    error="wrong"
                                    success="right"
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="text-center">
                                <MDBBtn color="success" onClick={this.onSubmit}>Register</MDBBtn>
                                <MDBBtn color="danger" onClick={this.redirectToHomePage}>Go Back</MDBBtn>
                            </div>
                            {error !== null ? <MDBAlert color="danger">{error.message}</MDBAlert>: null}
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default withRouter(RegisterForm);