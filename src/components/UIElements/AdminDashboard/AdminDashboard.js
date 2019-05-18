import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { MDBDataTable, MDBIcon, MDBBtn } from 'mdbreact';

// PC Ekle Butonu ve arayüzü
// Admin -> Doctor kaydı , isim, email, auto generate pk, password 
// Table dan delete işlemi, firebase üzerinden olabilir

const ADMINDASHBOARD_STATE = {
  'isRedirectedToCreateDoctor': false,
  'isRedirectedToCreatePC': false,
  'isRedirectedToUpdateDoctorForm': false,
  'deleteDoctor': false,
  'doctorsState': [],
}

class AdminDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {...ADMINDASHBOARD_STATE};
    this.firebase = this.props.firebase;
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  redirectToCreateDoctorForm = () => {
    this.setState({
      isRedirectedToCreateDoctor: true
    });
  }

  redirectToCreatePCForm = () => {
    this.setState({
      isRedirectedToCreatePC: true
    })
  }

  redirectToUpdateDoctorForm = () => {
    this.setState({
      isRedirectedToUpdateDoctorForm: true
    })
  }

  deleteDoctor = () => {
    this.setState({
      deleteDoctor: true
    });
  }

  showDoctors = async () => {
    let firebasePromise = this.props.firebase.getAllDoctors();
    let doctors = [];
    if (firebasePromise !== null) {
      await firebasePromise.then(snapshot => {
        snapshot.forEach(element => {
          doctors.push(element.data());
        })
      });
      this.setState({
        doctorsState: doctors
      });
    }
    else {
      return "Empty";
    }
  }

  componentDidMount = async () => {
    await this.showDoctors();
    console.log(this.state.doctorsState);
  }
  
  render() {
    
    let { isRedirectedToCreateDoctor, isRedirectedToCreatePC, isRedirectedToUpdateDoctorForm, deleteDoctor, doctorsState } = this.state;

    if (isRedirectedToCreateDoctor) {
      return (
          <Redirect to={ROUTES.CREATEDOCTOR} />
      );
    }
    if (isRedirectedToCreatePC) {
      return(
        <Redirect to={ROUTES.CREATEPC} />
      );
    }
    if (isRedirectedToUpdateDoctorForm) {
      return(
        <Redirect to={ROUTES.UPDATEDOCTOR} />
      )
    }
    if (deleteDoctor) {
      console.log("Silme İşlemi");
    }

    let name = [];
    let email = [];

    doctorsState.forEach((item, index) => {
      name[index] = item.name;
      email[index] = item.email;
    });

    let doctorsArray = [];

    for (let i=0; i<doctorsState.length; i++) {
      doctorsArray.push({
        name: name[i],
        speciality: 'Doctor',
        date: '2011/04/25',
        email: email[i],
        edit: <MDBBtn size="sm" outline color="primary" onClick = {this.redirectToUpdateDoctorForm}><MDBIcon icon="pencil-alt" /></MDBBtn>,
        delete: <MDBBtn size="sm" outline color="danger" onClick = {this.deleteDoctor}><MDBIcon icon="user-times" /></MDBBtn>
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
          label: 'Speciality',
          field: 'speciality',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Start date',
          field: 'date',
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
      rows: doctorsArray
    };
  
    return (
      <div className="responsive">
          <h2>Welcome Admin</h2>
          <h4>Here is the list of Doctors</h4>
          <hr/>
          {/* For admins to create pcs to recognize differences between them */}
          <MDBBtn color="elegant" onClick={this.redirectToCreatePCForm}>Create a PC</MDBBtn>
          <MDBBtn color="elegant" onClick={this.redirectToCreateDoctorForm}>Create a Doctor</MDBBtn>
          <hr />
          <MDBDataTable responsive striped bordered small data={data} />
      </div>
    );
  }
}

export default withRouter(AdminDashboard);