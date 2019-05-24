import React, { Component } from 'react';
import { Line, Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Utility from '../../../Helpers/helper';
import GraphBuilder from '../../../Helpers/graphBuilder';
import queryString from 'query-string'
class ChartsPage extends React.Component {

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">{this.props.patientName}</h3>
        <h4>Average experiment results in date based graph:</h4>
        <Line data={this.props.lineChartData} options={{ responsive: true }} />
        <h4>Last experiment average results:</h4>
        <Bar data={this.props.barChartData} options={{responsive: true}}></Bar>
        <h4>Level based response graph for all: </h4>
        <Line data={this.props.lineChartDataByLevel} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default class PatientDashboard extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
    this.lineChartData = {};
    this.state = { experiments: [], lineChartDataByLevel: [], blockExperiments: [], lineChartData: {}, barChartData: {}, patientName: '' };
  };

  processPatientReport = async () => {
    // Dynamic Patient Id is a must, it will come from query string
    let parsed = queryString.parse(window.location.search);
    console.log(parsed.id);
    var patientId = parsed.id;
    this.setState({
      patientName: parsed.name
    })
    var currentExperiments = [];
    
    var firebasePromise = this.props.firebase.getAllExperimentsWithPatientId(patientId);
    await this.firebase.getAllExperiments()
    .then(res => {
      this.setState({
        blockExperiments: res
      })
    });
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
  processExperimentsByLevel() { 
    console.log(this.state.blockExperiments);
    this.state.blockExperiments.forEach(experiment => {
      this.props.firebase.fillResultBlocksForDiffuclty(experiment);
   })
    this.setState({
      blockExperiments: this.props.firebase.calculateLevelBasedResult()
    });
  }

  requestLineChartGraphByLevel(){
    this.setState({
      lineChartDataByLevel: GraphBuilder.LineChartBuilderByLevel(this.state.blockExperiments)
    });
  }

  //Example codes below in componentDidMount. If you wanna use firebase get methods use in async function and when call happens to firebase;
  // use await keyword to wait thread to finish its work. 
  componentDidMount = async () => {
    await this.processPatientReport();
    this.processExperimentsByLevel();
    this.requestLineChartGraphByLevel();
    
  }

  render() {
    return (
      <div>
        <h2>PatientDashboard</h2>
          <ChartsPage patientName={this.state.patientName} lineChartDataByLevel={this.state.lineChartDataByLevel} barChartData={this.state.barChartData} lineChartData={this.state.lineChartData} />
      </div>
    )
    
  }
}

