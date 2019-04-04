import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBInput, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const gameScenarioOptions = [
    'Select', 'Apples', 'Plates', // Other options ....
];

const patientOptions = [
    'Select', 'Efe', 'Umut', 'Erkin', 'Hamza'
];

const defaultOptionForGameScenario = gameScenarioOptions[0];
const defaultOptionForPatient = patientOptions[0];

const DOCTORGETREPORTSFORM_STATE = {
    'modal2': false,
    'radio': 1,
    'startDate': new Date(),
}

class DoctorGetReportsForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {...DOCTORGETREPORTSFORM_STATE};
    }

    handleChange = (date) => {
      this.setState({
        startDate: date
      });
    }

    // For modal view
    toggle = nr => () => {
      let modalNumber = 'modal' + nr
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }

    // For radio buttons
    radioButton = (nr) => () => {
      this.setState({
        radio: nr
      });
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

  render() {
    
    return(
        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg">
            <MDBModalHeader toggle={this.toggle(2)}>Get Reports</MDBModalHeader>
            <MDBModalBody>
                <form>
                <p className="h5 text-center mb-4">Get Reports</p>
                <div className="black-text">
                    <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} far icon="id-card" />
                    <label style={{paddingRight: "10px"}}>Patient</label>
                    <Dropdown options={patientOptions} onChange={this._onSelect} value={defaultOptionForPatient} 
                    placeholder="Select an option" />
                    <MDBInput style = {{fontSize: "5px"}}
                        onClick={this.radioButton(1)}
                        checked = {this.state.radio===1 ? true : false}
                        label = "Time Based"
                        type = "radio"
                    />
                    <MDBInput style = {{fontSize: "5px"}}
                        onClick={this.radioButton(2)}
                        checked = {this.state.radio===2 ? true : false}
                        label = "Scenario Based"
                        type = "radio"
                    />
                    <br /> <br/>
                    {
                        this.state.radio === 1 ?
                        <MDBContainer>
                        <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} far icon="calendar-check" />
                        <label style={{paddingRight: "10px", textDecoration:"underlined"}}>Starting Date</label>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        /> 
                        <label style={{paddingRight: "10px", textDecoration:"underlined"}}>End Date</label>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        /> 
                        </MDBContainer>
                        :
                        <MDBContainer>
                        <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} icon="book" />
                        <label style={{paddingRight: "10px"}}>Game Scenario</label>
                        <Dropdown options={gameScenarioOptions} onChange={this._onSelect} 
                        value={defaultOptionForGameScenario} placeholder="Select an option"/>
                        </MDBContainer>
                    }
                    </div>
                    <br /> <br /> <hr />
                    <div className="text-center">
                    <MDBBtn color="primary" onClick={this.onSubmit}>Get Report</MDBBtn>
                    </div>
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
    )
  }
}

export default DoctorGetReportsForm;