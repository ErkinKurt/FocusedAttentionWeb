import React, { Component } from 'react'
import DoctorDashboard from '../UIElements/DoctorDashboard/DoctorDashboard';
import { FirebaseContext } from '../Firebase';

export default class Doctor extends Component {
  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => <DoctorDashboard firebase={firebase} />}
      </FirebaseContext.Consumer>
    )
  }
}
