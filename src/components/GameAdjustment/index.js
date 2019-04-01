import React, { Component } from 'react';
import GameAdjustmentsForm from '../UIElements/GameAdjustmentsForm/GameAdjustmentsForm'
import { FirebaseContext } from '../Firebase';

export default class CreateDoctor extends Component {
  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => <GameAdjustmentsForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    )
  }
}
