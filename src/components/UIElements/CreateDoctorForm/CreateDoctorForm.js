import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

class CreateDoctorForm extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center mt-5">
          <MDBCol md="6">
            <form>
              <p className="h5 text-center mb-4">Create New Doctor</p>
              <div className="grey-text">
                <MDBInput
                  label="Doctor's Full Name"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Doctor's Email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                label="Doctor's Password"
                name='password'
                value='{password}'
                icon="lock"
                group
                type="password"
                validate
                />
              </div>
              <div className="text-center">
                <MDBBtn color="primary">Register</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default CreateDoctorForm;