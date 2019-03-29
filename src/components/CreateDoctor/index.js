import React, { Component } from 'react'
import CreateDoctorForm from '../UIElements/CreateDoctorForm/CreateDoctorForm';
import { FirebaseContext } from '../Firebase';

class CreateDoctor extends Component {
  render() {
    return (
      <div>
         <FirebaseContext.Consumer>
          {firebase => <CreateDoctorForm firebase={firebase} />}
        </FirebaseContext.Consumer>
      </div>
    )
  }
}

export default CreateDoctor;
