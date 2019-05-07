import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBIcon} from 'mdbreact';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateDoctorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  render() {
    return (
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center mt-5">
          <MDBCol md="6">
            <form>
              <p className="h5 text-center mb-4">Create New Doctor</p>
              <div className="grey-text">
                <MDBInput
                  label="Full Name"
                  icon="user-md"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput 
                  label="Speciality"
                  icon="award"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} far icon="calendar-check" />
                <label style={{paddingRight: "10px", textDecoration:"underlined"}}>Starting Date</label>
                 <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                  />
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
                  name='password'
                  //value='{password}'
                  icon="lock"
                  group
                  type="password"
                  validate
                />
              </div>
              <div className="text-center">
                <MDBBtn color="primary">Create Doctor</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default CreateDoctorForm;