import React, { Component } from 'react';
import { Line, Radar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Utility from '../../../Helpers/helper';
import GraphBuilder from '../../../Helpers/graphBuilder';
class ChartsPage extends React.Component {

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">{this.props.patientName}</h3>
        <Line data={this.props.lineChartData} options={{ responsive: true }} />
        <Radar data={this.props.radarChartData} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default class PatientDashboard extends Component {

  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
    this.lineChartData = {};
    this.state = { experiments: [], patientId: "", lineChartData: {}, radarChartData: {} };
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
      lineChartData: GraphBuilder.LineChartBuilderByDate(this.state.experiments),
      radarChartData: GraphBuilder.RadarChartBuilder(this.state.experiments)
    });
  }

  //Example codes below in componentDidMount. If you wanna use firebase get methods use in async function and when call happens to firebase;
  // use await keyword to wait thread to finish its work. 
  async componentDidMount() {
    await this.processPatientReport();
  }


  render() {
    return (
      <div>
        <h2>PatientDashboard</h2>
        <ChartsPage patientName={"Erkin Kurt"} radarChartData={this.state.radarChartData} lineChartData={this.state.lineChartData} />
      </div>
    )
  }
}

