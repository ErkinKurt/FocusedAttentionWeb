//Helper class for patient experiment data and utilities..
/**
 * Utility helper class for global functionality.
 */
class Utility {
  /**
   * Sort experiment array by date. 
   * @param {Experiment[]} experiments
   */
  static sortExperimentsByDate = (experiments) => {
    experiments.sort((a, b) => {
      var dateA = new Date(a.experimentDate);
      var dateB = new Date(b.experimentDate);
      return dateA - dateB;
    })
  }
}
export default Utility;
