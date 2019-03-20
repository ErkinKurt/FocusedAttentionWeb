import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import { Redirect, withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';


const LOGINFORM_STATE = {
    emial: '',
    password: '',
    error: null,
    redirectFlag: false,
};


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = { ...LOGINFORM_STATE };
        this.redirectToRegister = this.redirectToRegister.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    redirectToRegister = () => {
        this.setState({
            redirectFlag: true
        });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        let { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...LOGINFORM_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            })

        event.preventDefault();
    };

    render() {
        let { redirectFlag, email, password, error } = this.state;

        //If page is redirected to SignUp page.
        if (redirectFlag) {
            return (
                <Redirect to={ROUTES.SIGN_UP} />
            );
        }

        return (
            <MDBContainer>
                <MDBRow className="d-flex justify-content-center mt-5">
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">FOCUSSED ATTENTION DISORDER</p>
                            <p className="h5 text-center mb-4">Login</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Type your email"
                                    icon="envelope"
                                    group
                                    value={email}
                                    name='email'
                                    onChange={this.onChange}
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    name='password'
                                    value={password}
                                    label="Type your password"
                                    icon="lock"
                                    onChange={this.onChange}
                                    group
                                    type="password"
                                    validate
                                />
                            </div>
                            <div className="text-center">
                                <MDBBtn color="primary" onClick={this.onSubmit}>Login</MDBBtn>
                                <MDBBtn color="success" onClick={this.redirectToRegister}>Register</MDBBtn>
                            </div>
                            {error !== null ? <MDBAlert color="danger">{error.message}</MDBAlert> : null}
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default withRouter(LoginForm);
