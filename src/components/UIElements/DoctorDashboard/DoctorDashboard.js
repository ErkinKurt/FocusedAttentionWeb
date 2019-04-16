import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBInput, MDBDataTable, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Redirect, withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// Doctor -> Patient Name, Age, Gender, email, password

// Make the distinction between calenders and show the dropdown menu option for scenario based

const gameScenarioOptions = [
  'Select', 'Apples', 'Plates', // Other options ....
];

const patientOptions = [
  'Select', 'Efe', 'Umut', 'Erkin', 'Hamza'
];

const defaultOptionForGameScenario = gameScenarioOptions[0];
const defaultOptionForPatient = patientOptions[0];


const DOCTORDASHBOARD_STATE = {
  'isRedirectedToCreatePatient': false,
  'isRedirectedToGameAdjustment': false,
  'modal2': false,
  'radio': 1,
  'startDate': new Date(),
  'endDate': new Date(),
  'patientsState': []
}

class DoctorDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = { ...DOCTORDASHBOARD_STATE };
    this.firebase = this.props.firebase;
  }

  processPatientReport = () => {
    var patientId = "ErkinKurt";
    var firebasePromise = this.props.firebase.getAllExperimentsWithPatientId(patientId);
    firebasePromise.then(snapshot => {
      snapshot.forEach(element => {
        console.log(element.data());
      })
    })
  }

  showPatients =  async () => {
    var firebasePromise = this.props.firebase.getAllPatientsForDoctor();
    let patients = [];
    if(firebasePromise !== null) {
      await firebasePromise.then(snapshot => {
        snapshot.forEach(element => {
          //console.log(element.data())
          patients.push(element.data())
        });
        this.setState({
          patientsState: patients
        });
      });
    }
    else {
      return "Empty";
    }
  }

  handleChangeStart = (date) => {
    this.setState({
      startDate: date,
    });
  }

  handleChangeEnd = (date) => {
    this.setState({
      endDate: date,
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

  componentDidMount = async () => { 
    await this.showPatients();
    console.log(this.state.patientsState);
  }


  render() {
    let { isRedirectedToCreatePatient, isRedirectedToGameAdjustment, 
      modal2, patientsState } = this.state;

    if (isRedirectedToCreatePatient) {
      return (
        <Redirect to={ROUTES.CREATEPATIENT} />
      )
    }

    if (isRedirectedToGameAdjustment) {
      return (
        <Redirect to={ROUTES.GAMEADJUSTMENT} />
      )
    }

    if (modal2) {
      return (
        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg">
          <MDBModalHeader toggle={this.toggle(2)}>Get Reports</MDBModalHeader>
          <MDBModalBody>
            <form>
              <p className="h5 text-center mb-4">Get Reports</p>
              <div className="black-text">
                <MDBIcon style={{ fontSize: "30px", paddingRight: "10px" }} far icon="id-card" />
                <label style={{ paddingRight: "10px" }}>Patient</label>
                <Dropdown options={patientOptions} onChange={this._onSelect} value={defaultOptionForPatient}
                  placeholder="Select an option" />
                <MDBInput style={{ fontSize: "5px" }}
                  onClick={this.radioButton(1)}
                  checked={this.state.radio === 1 ? true : false}
                  label="Time Based"
                  type="radio"
                />
                <MDBInput style={{ fontSize: "5px" }}
                  onClick={this.radioButton(2)}
                  checked={this.state.radio === 2 ? true : false}
                  label="Scenario Based"
                  type="radio"
                />
                <br /> <br />
                {
                  this.state.radio === 1 ?
                    <MDBContainer>
                      <MDBIcon style={{ fontSize: "30px", paddingRight: "10px" }} far icon="calendar-check" />
                      <label style={{ paddingRight: "10px", textDecoration: "underlined" }}>Starting Date</label>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeStart}
                      />

                      <label style={{ paddingRight: "10px", textDecoration: "underlined" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Date</label>
                      <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleChangeEnd}
                      />
                    </MDBContainer>
                    :
                    <MDBContainer>
                      <MDBIcon style={{ fontSize: "30px", paddingRight: "10px" }} icon="book" />
                      <label style={{ paddingRight: "10px" }}>Game Scenario</label>
                      <Dropdown options={gameScenarioOptions} onChange={this._onSelect}
                        value={defaultOptionForGameScenario} placeholder="Select an option" />
                    </MDBContainer>
                }
              </div>
              <br /> <br /> <hr />
              <div className="text-center">
                <MDBBtn color="primary" onClick={this.processPatientReport()}>Get Report</MDBBtn>
              </div>
            </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      )
    }

    // Fields
    let name=[];
    let age=[];
    let gender=[];
    let email=[];

    patientsState.forEach((item, index) => {
      name[index] = item.name;
      age[index] =  item.age;
      gender[index] = item.value;
      email[index] = item.email;
    });

    let patientsArray = []
  
    for (let i=0; i<name.length; i++) {
      patientsArray.push({
        name: name[i],
        age: age[i],
        gender: gender[i],
        email: email[i],
        edit: <MDBBtn size="sm" outline color="primary"><MDBIcon icon="pencil-alt" /></MDBBtn>,
        delete: <MDBBtn size="sm" outline color="danger"><MDBIcon icon="user-times" /></MDBBtn>
      })
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

      rows: patientsArray
    };

    return (
      <div className="responsive" >
        <h2>Welcome Doctor</h2>
        <h4>Here is the list of Patients</h4>
        <span>{patientsState.forEach((item) => {
          console.log("Name: " + item.name)
          console.log("Age: " + item.age)
          console.log("Gender: " + item.value)
          console.log("Email: " + item.email)
        })}</span>
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
        <MDBBtn color="elegant" /*onClick={this.showPatients()}*/>Show Patients</MDBBtn>
        <hr />
        {/* Datatable */}
        <MDBDataTable striped bordered small data={data} />
      </div>
    )
  }
}

export default withRouter(DoctorDashboard);
