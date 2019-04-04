import React, { Component } from 'react';
import CreatePCForm from '../../UIElements/CreatePCForm/CreatePCForm';
import { FirebaseContext } from '../../Firebase';

class CreatePC extends Component {
  render() {
    return (
        <div>
            <FirebaseContext.Consumer>
                {firebase => <CreatePCForm firebase={firebase} />}
            </FirebaseContext.Consumer>
        </div>
    )
  }
}

export default CreatePC;