import React, { Component } from 'react';
import CreatePCForm from '../../UIElements/CreatePCForm/CreatePCForm';
import { FirebaseContext } from '../../Firebase';

class CreatePC extends Component {
  render() {
    return (
            <FirebaseContext.Consumer>
                {firebase => <CreatePCForm firebase={firebase} />}
           </FirebaseContext.Consumer>
    )
  }
}

export default CreatePC;