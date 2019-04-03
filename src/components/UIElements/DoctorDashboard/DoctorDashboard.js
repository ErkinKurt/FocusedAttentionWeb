import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBInput, Dropdown, MDBDataTable, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { Redirect, withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Doctor -> Patient Name, Age, Gender, email, password

// Make the distinction between calenders and show the dropdown menu option for scenario based

const gameScenarioOptions = [
  'Select', 'Apples', 'Plates', // Other options ....
];

const defaultOptionForGameScenario = gameScenarioOptions[0];


const DOCTORDASHBOARD_STATE = {
    'isRedirectedToCreatePatient': false,
    'isRedirectedToGameAdjustment': false,
    'modal2': false,
    'radio': 1,
    'startDate': new Date()
}

class DoctorDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {...DOCTORDASHBOARD_STATE};
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

    redirectToCreatePatientForm = () => {
        this.setState({
            isRedirectedToCreatePatient: true
        });
    }

    redirectToGameAdjustmentForm = () => {
        this.setState({
            isRedirectedToGameAdjustment: true
        });
    }



    render() {
        let { isRedirectedToCreatePatient, isRedirectedToGameAdjustment, modal2 } = this.state;

        if (isRedirectedToCreatePatient) {
            return(
                <Redirect to = {ROUTES.CREATEPATIENT} />
            )
        }

        if (isRedirectedToGameAdjustment) {
            return(
                <Redirect to = {ROUTES.GAMEADJUSTEMT} />
            )
        }

        if (modal2) {
          return(
            <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg">
                <MDBModalHeader toggle={this.toggle(2)}>Get Reports</MDBModalHeader>
                <MDBModalBody>
                  <form>
                    <p className="h5 text-center mb-4">Get Reports</p>
                    <div className="black-text">
                        <MDBInput
                            label="Patient"
                            icon="user"
                            group
                            name='patient'
                            onChange={this.onChange}
                            type="patient"
                            validate
                            error="wrong"
                            success="right"
                        />
                        <MDBInput
                            onClick={this.radioButton(1)}
                            checked = {this.state.radio===1 ? true : false}
                            label = "Time Based"
                            type = "radio"
                        />
                        <MDBInput
                            onClick={this.radioButton(2)}
                            checked = {this.state.radio===2 ? true : false}
                            label = "Scenario Based"
                            type = "radio"
                        />
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
                            {console.log(gameScenarioOptions+defaultOptionForGameScenario)}
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
              

        const data = {
            columns: [
              {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Age',
                field: 'age',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Gender',
                field: 'gender',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Email',
                field: 'email',
                sort: 'asc',
                width: 100
              },
              // If click pencil, redirect admin to update admin form, if click trash, delete user
              {
                label: 'Edit',
                field: 'edit',
                width: 10
              },
              {
                label: 'Delete',
                field: 'delete',
                width: 10
              }
            ],
        
            // These are hard coded right now, but it will come from firebase
            rows: [
              {
                name: 'Ersoy Efe Uruk',
                age: '22',
                gender: 'Male',
                email: 'efeuruk@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Umutcan Berk Hasret',
                age: '22',
                gender: 'Male',
                email: 'umutcanberkhasret@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Erkin Kurt',
                age: '22',
                gender: 'Male',
                email: 'erkinkurt@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Hamza Melih Bayrakdar',
                age: '22',
                gender: 'Male',
                email: 'hamza@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Ersoy Efe Uruk',
                age: '22',
                gender: 'Male',
                email: 'efeuruk@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Ersoy Efe Uruk',
                age: '22',
                gender: 'Male',
                email: 'efeuruk@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Ersoy Efe Uruk',
                age: '22',
                gender: 'Male',
                email: 'efeuruk@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Ersoy Efe Uruk',
                age: '22',
                gender: 'Male',
                email: 'efeuruk@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Ersoy Efe Uruk',
                age: '22',
                gender: 'Male',
                email: 'efeuruk@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Ersoy Efe Uruk',
                age: '22',
                gender: 'Male',
                email: 'efeuruk@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Ersoy Efe Uruk',
                age: '22',
                gender: 'Male',
                email: 'efeuruk@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
              {
                name: 'Ersoy Efe Uruk',
                age: '22',
                gender: 'Male',
                email: 'efeuruk@gmail.com',
                edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
                delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
              },
            ]
          };
        
        return (
            <div className = "responsive" >
                <h2>Welcome Doctor</h2>
                <h4>Here is the list of Patients</h4>
                <hr />
                {/* Redirect to create patient form*/}
                <MDBBtn color="elegant" onClick={this.redirectToCreatePatientForm}>Create Patient</MDBBtn>
                {/* Adjustment of test difficulties for current scenario */}
                <MDBBtn color="elegant" onClick={this.redirectToGameAdjustmentForm}>Adjustments for Test</MDBBtn>
                {/* Redirect to get report form, in which user will select either in time 
                based or scenario based reports */}
                <MDBBtn color="elegant" onClick={this.toggle(2)}>Get Report</MDBBtn>
                {/* Send an email to himself/herself of some specific reports */}
                <MDBBtn color="elegant">Email Report</MDBBtn> 
                {/* Redirect to datatable, in datatable, edit patient and show patient's results
                Maybe it can be unnecessary we can show it at the beginning, when the page opens */}
                <MDBBtn color="elegant">Show Patients</MDBBtn>
                <hr />
                {/* Datatable */}
                <MDBDataTable striped bordered small data={data} />
            </div>
        )
    }
}

export default withRouter(DoctorDashboard);
