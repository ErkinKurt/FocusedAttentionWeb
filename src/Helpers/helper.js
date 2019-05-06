//Helper class for patient experiment data and utilities..

class Utility {
  static sortExperimentsByDate = (experiments) => {
    experiments.sort((a, b) => {
      var dateA = new Date(a.experimentDate);
      var dateB = new Date(b.experimentDate);
      return dateA - dateB;
    })
  }
}
export default Utility;
