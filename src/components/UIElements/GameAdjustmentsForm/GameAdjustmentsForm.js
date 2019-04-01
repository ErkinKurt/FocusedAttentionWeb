import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBIcon } from 'mdbreact';
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

class GameAdjustmentsForm extends Component {
    render() {
        return (
          <MDBContainer>
          <MDBRow className="d-flex justify-content-center mt-5">
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">Game Adjustments</p>
                <div className="grey-text">
                  
                  <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} far icon="id-card" />
                  <label style={{paddingRight: "10px"}}>Patient</label>
                  <Dropdown options={patientOptions} onChange={this._onSelect} value={defaultOptionForPatient} 
                  placeholder="Select an option" />
                  
                  <hr />

                  <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} icon="book" />
                  <label style={{paddingRight: "10px"}}>Game Scenario</label>
                  <Dropdown options={gameScenarioOptions} onChange={this._onSelect} 
                  value={defaultOptionForGameScenario} placeholder="Select an option"/>
                  
                  <MDBInput
                    label="Level"
                    icon="arrow-up"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary">Make Adjustment</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        );
      }
}

export default GameAdjustmentsForm;