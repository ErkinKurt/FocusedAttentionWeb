class GraphBuilder {

    static dataSetBuilder(options, data){
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

    //LineChart builder with the given experiments.
    static LineChartBuilderByDate(experiments) {
      //If compare is empty create regular chart...
      let dataLine = {}
      //Labels by date... ASCENDING ORDER
      dataLine.labels = experiments.map(experiment => {
        return experiment.experimentDate.slice(0, 10);
      });
      var correctResponseDataSet = this.dataSetBuilder({color: "blue", label: "Correct Response", showLine: true}, experiments.map(experiment => {
        return experiment.avgResult.avgCorrectResponse;
      }));
      var conditionErrorDataSet = this.dataSetBuilder({color: "red", label: "Condition Error", showLine: true}, experiments.map(experiment => {
        return experiment.avgResult.avgConditionError;
      }));
      var omissionErrorDataSet = this.dataSetBuilder({color:"green", label: "Omission Error", showLine: true}, experiments.map(experiment => {
        return experiment.avgResult.avgOmissionError;
      }));
      var responseTimeDataSet = this.dataSetBuilder({color: "black", label: "Response Time", showLine: false}, experiments.map(experiment => {
        return experiment.avgResult.avgResponseTime;
      }));
      
      dataLine.datasets = [correctResponseDataSet, conditionErrorDataSet, omissionErrorDataSet, responseTimeDataSet];
      return dataLine;
    }
  }
  export default GraphBuilder;