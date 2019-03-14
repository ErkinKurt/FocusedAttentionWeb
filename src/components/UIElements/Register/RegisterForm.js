import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

class FormPage extends Component {
    redirectToHomePage = () => {
        this.props.history.push("/");
    }
    render() {
        return (
            <MDBContainer>
                <MDBRow className = "d-flex justify-content-center mt-5">
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">FOCUSSED ATTENTION DISORDER</p>
                            <p className="h5 text-center mb-4">Sign up</p>
                            <div className="grey-text">
                            <MDBInput
                                label="Your name"
                                icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                            />
                            <MDBInput
                                label="Your email"
                                icon="envelope"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                            />
                            <MDBInput
                                label="Confirm your email"
                                icon="exclamation-triangle"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                            />
                            <MDBInput
                                label="Your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                            />
                            </div>
                            <div className="text-center">
                            <MDBBtn color="success">Register</MDBBtn>
                            <MDBBtn color="primary" onClick={this.redirectToHomePage}>Go Back</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default FormPage;