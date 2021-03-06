/**
 * Helper class for graph building layer.
 */
class GraphBuilder {

    /**
     * Creates the dataset for line chart.
     * @param {JSON} options Dataset Options
     * @param {Data[]} data Data from patient experiments.
     * @returns {DataSet[]} Dataset with options array.
     */
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

    /**
     * Creates the dataset for radar chart.
     * @param {JSON} options DataSet Options
     * @param {Data[]} data Data from patient experiments.
     * @returns {DataSet[]} Dataset with options array.
     */
    static radarChartDataSetBuilder(options, data){
      var dataSet = {
        label: options.label,
        fill: options.fill === undefined ? true : false,
        backgroundColor: options.color,
        data: data
      }
      return dataSet;
    }

    /**
     * Creates the bar chart.
     * @param {Data[]} data Data from patient experiments.
     * @returns {JSON} Barchart..
     */
    static BarChartBuilder(experiments){
      let dataBar = {};
      var lastExperiment = experiments[experiments.length-1].avgResult;
      dataBar.labels = ["Correct Response", "Condition Error", "Omission Error", "Response Time"];
      dataBar.datasets = [{
        label: "Last Experiment",
        backgroundColor: ["blue","red","green","black"],
        data: [lastExperiment.avgCorrectResponse, lastExperiment.avgConditionError, lastExperiment.avgOmissionError, lastExperiment.avgResponseTime]
      }
      ];
      return dataBar;
    }

    //RadarChart for latest experiment..
    //Abi radarchart iptal... İstedigim seyi gösteremedim...
    //Design Choice... We can get all the experiments and show the latest one
    //OR... we can get only the latest experiment.
    /**
     * Creates radar chart withthe given experiments.
     * @param {Experiments[]} experiments 
     * @returns {JSON} RadarChart
     */
    static RadarChartBuilder(experiments){
      let dataRadar = {};
      dataRadar.labels = experiments.map(experiment => {
        return experiment.experimentDate.slice(0, 10);
      });
      var correctResponseDataSet = this.radarChartDataSetBuilder({color: "blue", label: "CorrectResponse"}, experiments.map(experiment => {
        return experiment.avgResult.avgCorrectResponse;
      }));
      var conditionErrorDataSet = this.radarChartDataSetBuilder({color: "red",label: "Condition Error"},experiments.map(experiment => {
        return experiment.avgResult.avgConditionError;
      }));
      var omissionErrorDataSet = this.radarChartDataSetBuilder({color: "green", label:"Omission Error"}, experiments.map(experiment => {
        return experiment.avgResult.avgOmissionError;
      }));
      var responseTimeDataSet = this.radarChartDataSetBuilder({color: "black", label: "Response Time", fill: false}, experiments.map(experiment => {
        return experiment.avgResult.avgResponseTime;
      }));
      dataRadar.datasets = [correctResponseDataSet, conditionErrorDataSet, omissionErrorDataSet, responseTimeDataSet];

      return dataRadar;
    }

    //LineChart builder with the given experiments.
    /**
     * LineChart builder with the given experiments.
     * @param {Experiments[]} experiments 
     * @returns {JSON} LineChart
     */
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

    static LineChartBuilderByLevel(experiments){
      let dataLine = {};
      //Labels by date... ASCENDING ORDER
      dataLine.labels = experiments.map(experiment => {
        return experiment.blockDifficulty;
      });
      var correctResponseDataSet = this.lineChartDataSetBuilder({color: "blue", label: "Correct Response", showLine: true}, experiments.map(experiment => {
        return experiment.avgBlock.avgCorrectResponse;
      }));
      var conditionErrorDataSet = this.lineChartDataSetBuilder({color: "red", label: "Condition Error", showLine: true}, experiments.map(experiment => {
        return experiment.avgBlock.avgConditionError;
      }));
      var omissionErrorDataSet = this.lineChartDataSetBuilder({color:"green", label: "Omission Error", showLine: true}, experiments.map(experiment => {
        return experiment.avgBlock.avgOmissionError;
      }));
      var responseTimeDataSet = this.lineChartDataSetBuilder({color: "black", label: "Response Time", showLine: false}, experiments.map(experiment => {
        return experiment.avgBlock.avgResponseTime;
      }));
      
      dataLine.datasets = [correctResponseDataSet, conditionErrorDataSet, omissionErrorDataSet, responseTimeDataSet];
      return dataLine;
    }
  }
  export default GraphBuilder;