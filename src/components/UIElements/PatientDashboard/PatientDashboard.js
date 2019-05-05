import React, { Component } from 'react';
import Utility from '../../../helper';
export default class PatientDashboard extends Component {
  
  constructor(props){
    super(props);
    this.firebase = this.props.firebase;
    this.state = {experiments : [], patientId: "", experimentResults: []};
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
      </div>
    )
  }
}

class ChartsPage extends React.Component {
  state = {
    dataLine: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }
  }
}
