class GraphBuilder {

    static lineChartDataSetBuilder(options, data){
        var dataSet = {
          data: data,
          showLine: options.showLine,
          fill: false,
          lineTension: 0.1,
          backgroundColor: options.color,
          borderColor: options.color,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: options.color,
          pointBackgroundColor: options.color,
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: options.color,
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 10,
          label: options.label
        }
      
      return dataSet;
    }

    static radarChartDataSetBuilder(options, data){
      var dataSet = {
        label: options.label,
        fill: options.fill === undefined ? true : false,
        backgroundColor: options.color,
        data: data
      }
      return dataSet;
    }

    //RadarChart for latest experiment..
    //Design Choice... We can get all the experiments and show the latest one
    //OR... we can get only the latest experiment.
    static RadarChartBuilder(experiments){
      var lastExperiment = experiments[experiments.length-1].avgResult;
      let dataRadar = {};
      var correctResponseDataSet = this.radarChartDataSetBuilder({color: "blue", label: "CorrectResponse"}, lastExperiment.avgCorrectResponse);
      var conditionErrorDataSet = this.radarChartDataSetBuilder({color: "red",label: "Condition Error"},lastExperiment.avgConditionError);
      var omissionErrorDataSet = this.radarChartDataSetBuilder({color: "red", label:"Omission Error"}, lastExperiment.avgOmissionError);
      var responseTimeDataSet = this.radarChartDataSetBuilder({color: "black", label: "Response Time", fill: false}, lastExperiment.avgResponseTime);
      dataRadar.datasets = [correctResponseDataSet, conditionErrorDataSet, omissionErrorDataSet, responseTimeDataSet];

      return dataRadar;
    }

    //LineChart builder with the given experiments.
    static LineChartBuilderByDate(experiments) {
      //If compare is empty create regular chart...
      let dataLine = {};
      //Labels by date... ASCENDING ORDER
      dataLine.labels = experiments.map(experiment => {
        return experiment.experimentDate.slice(0, 10);
      });
      var correctResponseDataSet = this.lineChartDataSetBuilder({color: "blue", label: "Correct Response", showLine: true}, experiments.map(experiment => {
        return experiment.avgResult.avgCorrectResponse;
      }));
      var conditionErrorDataSet = this.lineChartDataSetBuilder({color: "red", label: "Condition Error", showLine: true}, experiments.map(experiment => {
        return experiment.avgResult.avgConditionError;
      }));
      var omissionErrorDataSet = this.lineChartDataSetBuilder({color:"green", label: "Omission Error", showLine: true}, experiments.map(experiment => {
        return experiment.avgResult.avgOmissionError;
      }));
      var responseTimeDataSet = this.lineChartDataSetBuilder({color: "black", label: "Response Time", showLine: false}, experiments.map(experiment => {
        return experiment.avgResult.avgResponseTime;
      }));
      
      dataLine.datasets = [correctResponseDataSet, conditionErrorDataSet, omissionErrorDataSet, responseTimeDataSet];
      return dataLine;
    }
  }
  export default GraphBuilder;