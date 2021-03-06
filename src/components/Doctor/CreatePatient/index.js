import React, { Component } from 'react';
import CreatePatientForm from '../../UIElements/CreatePatientForm/CreatePatientForm';
import { FirebaseContext } from '../../Firebase';

export default class CreatePatient extends Component {
  render() {
    return (
        <FirebaseContext.Consumer>
         {firebase => <CreatePatientForm firebase={firebase} />}
        </FirebaseContext.Consumer>
    )
  }
}
