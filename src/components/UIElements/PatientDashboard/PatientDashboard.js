import React, { Component } from 'react';
import { Line, Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Utility from '../../../Helpers/helper';
import GraphBuilder from '../../../Helpers/graphBuilder';
class ChartsPage extends React.Component {

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">{this.props.patientName}</h3>
        <Line data={this.props.lineChartData} options={{ responsive: true }} />
        <Bar data={this.props.barChartData} options={{responsive: true}}></Bar>
      </MDBContainer>
    );
  }
}

export default class PatientDashboard extends Component {

  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
    this.lineChartData = {};
    this.state = { experiments: [], patientId: "", lineChartData: {}, barChartData: {} };
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
      barChartData: GraphBuilder.BarChartBuilder(this.state.experiments)
    });
  }

  //Example codes below in componentDidMount. If you wanna use firebase get methods use in async function and when call happens to firebase;
  // use await keyword to wait thread to finish its work. 
  async componentDidMount() {
    await this.processPatientReport();
    //await this.props.firebase.deletePatientsWhichIsNotDoctors("3SBvlMGU3whzlNnRXgQdQXeeWH73");

    // this.props.firebase.updateBlockForPatient() ;
  }


  render() {
    return (
      <div>
        <h2>PatientDashboard</h2>
        {/* <ChartsPage patientName={"Erkin Kurt"} barChartData={this.state.barChartData} lineChartData={this.state.lineChartData} /> */}
      </div>
    )
  }
}

