import React, { Component } from 'react'
import AdminDashboard from '../UIElements/AdminDashboard/AdminDashboard';
import { FirebaseContext } from '../Firebase';

class Admin extends Component {
  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => <AdminDashboard firebase={firebase} />}
      </FirebaseContext.Consumer>
    )
  }
}

export default Admin;