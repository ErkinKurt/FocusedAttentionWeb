import React, { Component } from 'react';
import UpdateDoctorForm from '../../UIElements/UpdateDoctorForm/UpdateDoctorForm';
import { FirebaseContext } from '../../Firebase';

class UpdateDoctor extends Component {
  render() {
    return (
        <FirebaseContext.Consumer>
            {firebase => <UpdateDoctorForm firebase={firebase} />}
        </FirebaseContext.Consumer>
    )
  }
}

export default UpdateDoctor;