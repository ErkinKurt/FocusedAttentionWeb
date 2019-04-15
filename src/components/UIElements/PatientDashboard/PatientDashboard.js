import React, { Component } from 'react'

export default class PatientDashboard extends Component {
  
  constructor(props){
    super(props);
    this.firebase = this.props.firebase;
    this.state = {experiments : []};
  };

  processPatientReport = async () => {
    var patientId = "ErkinKurt";
    var currentExperiments = [];
    var firebasePromise = this.props.firebase.getAllExperimentsWithPatientId(patientId);
    await firebasePromise.then(snapshot => {
      snapshot.forEach(element => {
        currentExperiments.push(element.data());
      });
      this.setState({
        experiments: currentExperiments
      });
    })
  }

  async componentDidMount(){
    await this.processPatientReport();
    console.log(this.firebase.processAnExperiment(this.state.experiments[0]));
  }
  
  render() {
    return (
      <div>
        <h2>PatientDashboard</h2>
      </div>
    )
  }
}
