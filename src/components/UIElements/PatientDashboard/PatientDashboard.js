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

  //Example codes below in componentDidMount. If you wanna use firebase get methods use in async function and when call happens to firebase;
  // use await keyword to wait thread to finish its work. 
  async componentDidMount(){
    await this.processPatientReport();
    console.log(this.firebase.processAnExperiment(this.state.experiments[0]));
    
    //Create pc for doctor example..
    this.firebase.createPcForDoctor("broadangle");
    
    //Get all pc example
    // var a = await this.firebase.getAllPcForClinic();
    // a.forEach(element => {
    //   console.log(element.data());
    // })
    
    //Set game adjustment example.
    // this.firebase.setGameAdjustmentForPc({
    //   lagaluga: "Lagalua",
    //   asdıjqwd: "sadjd"
    // }, "6PsbmwUM36XURb01iZbI");
  }
  
  render() {
    return (
      <div>
        <h2>PatientDashboard</h2>
      </div>
    )
  }
}
