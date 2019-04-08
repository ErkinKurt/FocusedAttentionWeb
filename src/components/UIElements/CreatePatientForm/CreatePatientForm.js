import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBIcon } from 'mdbreact';
import Combobox from 'react-widgets/lib/Combobox';
import 'react-widgets/dist/css/react-widgets.css';

const CREATEPATIENTFORM_STATE = {
  'name': '',
  'age': '',
  'value': 'select',
  'email': '',
  'password': ''
};

let genders = ['select', 'male', 'female'];



class CreatePatientForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {...CREATEPATIENTFORM_STATE};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
  }


  onSubmit = (event) => {
    let { name, age, value, email, password } = this.state;
    let patient = {
      name, age, value, email, password,
    }
    this.props.firebase.createPatientForDoctor(patient);
    event.preventDefault();
  }

  render() {
    let { name, age, value, email, password } = this.state;

    return (
      <MDBContainer>
      <MDBRow className="d-flex justify-content-center mt-5">
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Create Patient</p>
            <div className="black-text">
              <MDBInput
                label="Full Name"
                name="name"
                value={name}
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={this.onChange}
              />
               <MDBInput
                label="Age"
                name="age"
                value={age}
                icon="calendar-check"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={this.onChange}
              />
              <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} far icon="id-card" />
              <label style={{paddingRight: "10px"}}>Gender</label>
              <Combobox onChange={value=>this.setState({value})} value={value} data={genders}  />

              <MDBInput
                label="Email"
                name="email"
                value={email}
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                onChange={this.onChange}
              />
              <MDBInput
                label="Password"
                name="password"
                value={password}
                icon="lock"
                group
                type="password"
                validate
                onChange={this.onChange}
              />
            </div>
            <div className="text-center">
              <MDBBtn color="primary" onClick = {this.onSubmit}>Create Patient</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    );
  }
}

export default CreatePatientForm;
