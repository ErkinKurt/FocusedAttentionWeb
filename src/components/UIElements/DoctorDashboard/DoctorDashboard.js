import React, { Component } from 'react';
import { MDBBtn, MDBDataTable, MDBIcon  } from 'mdbreact';
import { Redirect, withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

// Doctor -> Patient Name, Age, Gender, email, password

const DOCTORDASHBOARD_STATE = {
    'isRedirectedToCreatePatient': false,
    'isRedirectedToGameAdjustment': false,
}

class DoctorDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {...DOCTORDASHBOARD_STATE};
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
        let { isRedirectedToCreatePatient, isRedirectedToGameAdjustment } = this.state;

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
                <MDBBtn color="elegant">Get Report</MDBBtn>
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
