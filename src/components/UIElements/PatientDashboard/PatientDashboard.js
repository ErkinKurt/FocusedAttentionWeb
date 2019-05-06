import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Utility from '../../../Helpers/helper';
import GraphBuilder from '../../../Helpers/graphBuilder';
class ChartsPage extends React.Component {

render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">{this.props.patientName}</h3>
        <Line data={this.props.graphData} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default class PatientDashboard extends Component {
  
  constructor(props){
    super(props);
    this.firebase = this.props.firebase;
    this.graphData = {};
    this.state = {experiments : [], patientId: "", graphData: {}};
  };

  processPatientReport = async () => {
    var patientId = "OtvW7LIfqCTwzaYERpkZPQ5XtW42";
    var currentExperiments = [];
    var firebasePromise = this.props.firebase.getAllExperimentsWithPatientId(patientId);
    await firebasePromise.then(snapshot => {
      snapshot.forEach(element => {
        currentExperiments.push(element.data());
      });
      this.setState({
        experiments: this.firebase.getAllExperimentResults(currentExperiments),
      });
    })
    Utility.sortExperimentsByDate(this.state.experiments);
    this.setState({
      graphData: GraphBuilder.LineChartBuilderByDate(this.state.experiments)
    })
  }

  //Example codes below in componentDidMount. If you wanna use firebase get methods use in async function and when call happens to firebase;
  // use await keyword to wait thread to finish its work. 
  async componentDidMount(){
    await this.processPatientReport();
    
  }
  
  
  render() {
    return (
      <div>
        <h2>PatientDashboard</h2>
        <ChartsPage patientName = {"Erkin Kurt"} graphData = {this.state.graphData}/>
      </div>
    )
  }
}

