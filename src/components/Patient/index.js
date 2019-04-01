import React, { Component } from 'react'
import PatientDashboard from '../UIElements/PatientDashboard/PatientDashboard';
import { FirebaseContext } from '../Firebase';

export default class Patient extends Component {
  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => <PatientDashboard firebase={firebase} />}
      </FirebaseContext.Consumer>
    )
  }
}
