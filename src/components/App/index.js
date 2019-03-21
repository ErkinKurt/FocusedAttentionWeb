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
import CreateDoctorPage from '../CreateDoctor';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class App extends Component {
  render() {
    return (
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
          
        </div>
      </Router>
    );
  }
}

export default App;