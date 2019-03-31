import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBIcon } from 'mdbreact';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  'Select', 'Male', 'Female'
];

const defaultOption = options[0];


class CreatePatientForm extends Component {
  render() {
    
    return (
      <MDBContainer>
      <MDBRow className="d-flex justify-content-center mt-5">
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Create Patient</p>
            <div className="grey-text">
              <MDBInput
                label="Full Name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
               <MDBInput
                label="Age"
                icon="calendar-check"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} far icon="id-card" />
              <label style={{paddingRight: "10px"}}>Gender</label>
              <Dropdown options={options} onChange={this._onSelect} value={defaultOption} 
              placeholder="Select an option" />
              <MDBInput
                label="Email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Password"
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

export default CreatePatientForm;
