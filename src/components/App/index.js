import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import DoctorPage from '../Doctor';
import PatientPage from '../Patient';
import CreateDoctorPage from '../Admin/CreateDoctor';
import CreatePCPage from '../Admin/CreatePC';
import UpdateDoctorPage from '../Admin/UpdateDoctor';
import CreatePatientPage from '../Doctor/CreatePatient';
import GameAdjustmentPage from '../Doctor/GameAdjustment';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {AuthUserContext} from '../Session';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount(){
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({authUser})
        : this.setState({authUser: null});
    });
  }

  componentWillUnmount(){
    this.listener();
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
      <Router>
        <div>
        <Navigation />
          <hr />

          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
          <Route path={ROUTES.HOME} component={HomePage}/>
          <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
          <Route path={ROUTES.ADMIN} component={AdminPage}/>
          <Route path={ROUTES.DOCTOR} component={DoctorPage}/>
          <Route path={ROUTES.PATIENT} component={PatientPage}/>
          <Route path={ROUTES.CREATEDOCTOR} component={CreateDoctorPage}/>
          <Route path={ROUTES.CREATEPC} component={CreatePCPage}/>
          <Route path={ROUTES.UPDATEDOCTOR} component={UpdateDoctorPage}/>
          <Route path={ROUTES.CREATEPATIENT} component={CreatePatientPage}/>
          <Route path={ROUTES.GAMEADJUSTMENT} component={GameAdjustmentPage}/>
          
        </div>
      </Router>
      </AuthUserContext.Provider>
    );
  }
}

export default App;