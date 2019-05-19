import app from "firebase/app";
import FirebaseContext from "./context";
import "firebase/auth";
import "firebase/firestore";
import * as stats from "stats-lite";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

/**
 * This class contains all the utilty methods for the Firebase
 * authentication and C.R.U.D operations.
 */
export class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();
    //this.auth.currentUser.uid;

    //Crud app instantiation...
    this.crudApp = app.initializeApp(config, "crud");

    this.crudAuth = this.crudApp.auth();
    this.password = "Password1.";
    this.ClinicId = "Tesla";

    //Experiments...
    //Kod leş oldu. SOLID Principle ile gram alakası yok. Pu ak... Yetiştirmemiz lazım ama ... degil
    this.ExperimentResults = [];
    this.resultBlocksForDifficulty = [];
    for(var i = 0; i < 20; i++){
      this.resultBlocksForDifficulty.push(new this.blockWithDifficulty(i));
    }
    this.allExperiments = [];
  }

  updateBlockForPatient(patientId, experimentId, startIndex, endIndex) {
    var BlockList = [];
    this.firestore
      .collection("Patients")
      .doc(patientId)
      .collection("Experiments")
      .doc(experimentId)
      .get()
      .then(snapshot => {
        BlockList = snapshot.data().BlockList;
      })
      .catch(error => {
        console.log(error);
      });
    BlockList = BlockList.splice(startIndex, endIndex - startIndex);
    console.log(BlockList);
  }

  // *** Auth API ***
  /**
   * This method creates authenticated user in firebase project.
   * @param {string} email user email
   * @param {string} password user password
   */
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  /**
   * This method signes in the user with the email and password.
   * @param {string} email user email
   * @param {string} password user password
   */
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  /**
   * This method signs out the user in the firebase auth context.
   */
  doSignOut = () => this.auth.signOut();

  /**
   * This method resets the password with given email.
   * @param {string} email user_email
   */
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  /**
   * This method updates the password for the current user in auth context.
   * @param {string} password user_password
   */
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //Firebase Util

  //Set GameAdjustment to Given Pc...
  //Parameters GameAdjustment and PcId (DocumentId)
  /**
   * 
   * @param {GameAdjustment} gameAdjustmentObject 
   * @param {DocumentId} pcId 
   * @description This method updates the game adjustment instance in firebase with given pcId. 
   */
  setGameAdjustmentForPc(gameAdjustmentObject, pcId) {
    this.firestore
      .collection("Computers")
      .doc(pcId)
      .update({
        GameAdjustment: gameAdjustmentObject
      })
      .then(success => {
        alert("Game adjustment successfully updated." + success);
      })
      .catch(error => {
        alert("Error during updating GameAdjustment" + error);
      });
  }

  //Get All pc for clinic..
  /**
   * Gets all computers with given clinicId
   * @param {string} clinicId 
   * @returns {QuerySnapshot}
   */
  getAllPcForClinic = clinicId => {
    //ClinicId is fixed. We can change the implementation later Clinic is in charge.
    return this.firestore
      .collection("Computers")
      .where("ClinicId", "==", this.ClinicId)
      .get();
  };

  //Insert computer into Cloudstore.. ClinicId is hardcodded.
  /**
   * Inserts computer into Cloud Firestore.
   * @param {string} clinicId 
   * @param {string} uid UserId in firebase
   * @param {string} pcName Pc name in the clinic
   */
  createPcInFirestore = (clinicId, uid, pcName) => {
    this.firestore
      .collection("Computers")
      .doc(uid)
      .set({
        ClinicId: clinicId,
        PcName: pcName,
        GameAdjustment: {}
      });
  };

  // Get All doctors from Firebase
  /**
   * get all doctors from firebase
   * @returns {QuerySnapshot} Doctors
   */
  getAllDoctors = () => {
    let doctors =  this.firestore.collection("Doctors").get();
    return doctors;
  };

  ///<summary>Create pc with authenticated user's alies.</summary>
  ///<param name="pcName" dataType="string"> Name of the pc.</param>
  /**
   * Create pc with authenticated user's alies.
   * @param {string} pcName Name of the pc
   */
  createPcForDoctor = pcName => {
    var doctorName = this.auth.currentUser.email.split("@gmail.com")[0];
    var alias = pcName + doctorName + "@gmail.com";
    this.crudAuth
      .createUserAndRetrieveDataWithEmailAndPassword(alias, this.password)
      .then(response => {
        console.log("Create pc response: " + response);
        //Creating Pc in database...
        this.createPcInFirestore(
          this.ClinicId,
          this.crudAuth.currentUser.uid,
          alias
        );
        this.crudAuth.signOut();
        return true;
      })
      .catch(error => {
        console.log("Error during creating Pc for doctor: " + error);
        return false;
      });
  };

  //Get all patients for authenticated doctor. Returns QuerySnapshot..
  //QuerySnapshot.data() will get the related document in json format.
  //Returns promise. Use .then() to resolve and .catch() to handle error.
  /**
   * Get all patients for authenticated doctor.
   * @returns {Promise} AllPatientsQuerySnapshot
   */
  getAllPatientsForDoctor = () => {
    if (this.auth.currentUser === null) return null;
    else {
      var doctorId = this.auth.currentUser.uid;
      return this.firestore
        .collection("Doctors")
        .doc(doctorId)
        .collection("Patients")
        .get();
    }
  };

  //Get all experiments of the given patientId.
  //Need to figure out what will be the query types? Do we wanna get specific experiment?
  //Do we need to get all experiments?
  /**
   * Get all the experiments with given patientId.
   * @param {string} patientId 
   * @returns {Promise} QuerySnapshot Experiments
   */
  getAllExperimentsWithPatientId = patientId => {
    return this.firestore
      .collection("Patients")
      .doc(patientId)
      .collection("Experiments")
      .get();
  };

  async getAllExperiments(){
    this.firestore.collection("Patients").get().then(QuerySnapshot => {
      QuerySnapshot.docs.map(documentSnapshot => {
        this.firestore.collection("Patients").doc(documentSnapshot.id).collection("Experiments").get().then(result => {
          result.docs.map(documentS => {
            this.firestore.collection("Patients").doc(documentSnapshot.id).collection("Experiments").doc(documentS.id).get().then(resultData => {
              this.allExperiments.push(resultData.data());
            })
          })
        })
      })
    });
  }

  /**
   * Gets all experiments of the given patientId and gameScenario
   * @param {string} patientId 
   * @param {string} gameScenario 
   * @returns {Promise} QuerySnapshot Experiment
   */
  getAllExperimentsWithPatientIdandGameScenario(patientId, gameScenario) {
    return this.firestore
      .collection("Patients")
      .doc(patientId)
      .collection("Experiments")
      .where("GameId", "==", gameScenario)
      .get();
  }

  //Delete...
  deletePatientsWhichIsNotDoctors(patientId) {
    this.firestore
      .collection("Doctors")
      .doc("SPzW2IZkaycPbVgr2OvXRTtk9b63")
      .collection("Patients")
      .doc(patientId)
      .get()
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  ///<summary>Create patients for authenticated doctor.</summary>
  ///<param name="patient" dataType="json"> Patient object.</param>
  /**
   * Creates patient for authenticated doctor.
   * @param {json} patient Patient object.
   */
  createPatientForDoctor = patient => {
    if (
      patient !== null &&
      patient.email !== null &&
      this.auth.currentUser !== null
    ) {
      var doctorId = this.auth.currentUser.uid;
      var patientEmail = patient.email;
      this.crudAuth
        .createUserWithEmailAndPassword(patientEmail, patient.password)
        .then(() => {
          var patientId = this.crudAuth.currentUser.uid;
          this.firestore
            .collection("Doctors")
            .doc(doctorId)
            .collection("Patients")
            .doc(patientId)
            .set(patient)
            .then(resolve => {
              alert("New patient is created");
              //alert(resolve);
              this.crudAuth.signOut();
            })
            .catch(error => alert("Error on adding patient to db." + error));
        })
        .catch(error => alert("Error on creating patient." + error));
    } else {
      console.log("No patient passed during create patient method.");
    }
  };

  //Calculate Patient Statistics. In an experiment

  /**
   * Processes all experiments and return results.
   * @param {Experiments[]} experiments 
   * @returns {ExperimentResults[]} ExperimentResults
   */
  getAllExperimentResults(experiments) {
    this.processAllExperiments(experiments);
    return this.ExperimentResults;
  }

  /**
   * Process each experiment in the array.
   * @param {Experiments[]} experiments 
   */
  processAllExperiments(experiments) {
    this.ExperimentResults.length = 0;
    experiments.forEach(experiment => {
      this.ExperimentResults.push(this.processAnExperiment(experiment));
    });
  }

  /**
   * Calculate avgBlocks mean and sd for total experiment.
   * @param {json} avgBlocks 
   * @returns {json} avgResult
   */
  calculateAvgResultForExperiment(avgBlocks) {
    var result = {
      ConditionError: [],
      CorrectResponse: [],
      OmissionError: [],
      ResponseTime: []
    };
    var avgResult = {
      avgConditionError: 0,
      sdConditionError: 0,
      avgCorrectResponse: 0,
      sdCorrectResponse: 0,
      avgOmissionError: 0,
      sdOmmisionError: 0,
      avgResponseTime: 0,
      sdResponseTime: 0
    };
    avgBlocks.forEach(block => {
      result.ConditionError.push(block.avgConditionError);
      result.CorrectResponse.push(block.avgCorrectResponse);
      result.OmissionError.push(block.avgOmissionError);
      result.ResponseTime.push(block.avgResponseTime);
    });
    avgResult.avgConditionError = stats.mean(result.ConditionError);
    avgResult.sdConditionError = stats.stdev(result.ConditionError);
    avgResult.avgCorrectResponse = stats.mean(result.CorrectResponse);
    avgResult.sdCorrectResponse = stats.stdev(result.CorrectResponse);
    avgResult.avgOmissionError = stats.mean(result.OmissionError);
    avgResult.sdOmmisionError = stats.stdev(result.OmissionError);
    avgResult.avgResponseTime = stats.mean(result.ResponseTime);
    avgResult.sdResponseTime = stats.stdev(result.ResponseTime);

    return avgResult;
  }

  /**
   * Process an experiment and returns the experiment result to push into ResultArray.
   * @param {json} experiment 
   * @returns {json} experimentToPush
   */
  processAnExperiment(experiment) {
    var experimentToPush = {
      experimentId: "",
      experimentDate: Date,
      avgBlocks: [],
      avgResult: {}
    };

    var blockList = experiment.BlockList;
    experimentToPush.experimentId = experiment.GameScenario;
    experimentToPush.experimentDate = experiment.ExperimentDate;
    blockList.forEach(block => {
      experimentToPush.avgBlocks.push(
        this.calculateAverageTrialValuesInBlock(block)
      );
    });
    experimentToPush.avgResult = this.calculateAvgResultForExperiment(
      experimentToPush.avgBlocks
    );

    return experimentToPush;
  }

  blockWithDifficulty(blockDifficulty){
    this.blockDifficulty =  blockDifficulty;
    this.blockList = [];
  }

  fillResultBlocksForDiffuclty(experiment){
    var blockList = experiment.BlockList;
    this.resultBlocksForDifficulty.forEach(resultBlock => {
      blockList.forEach(block => {
        if(resultBlock.blockDifficulty === block.Difficulty){
          resultBlock.blockList.push(block);
        }
      })
    });
    
    // console.log("calculateLevelBasedResult");
  }

  avgBlockResult(blockDifficulty, avgBlock){
    this.blockDifficulty = blockDifficulty;
    this.avgBlock = avgBlock;
  }

  calculateLevelBasedResult(){
    var avgBlockResultList = [];
    this.resultBlocksForDifficulty.forEach(resultBlock => {
      var a = [];
      resultBlock.blockList.forEach(block => {
        a.push(this.calculateAverageTrialValuesInBlock(block));
      })
      avgBlockResultList.push(new this.avgBlockResult(resultBlock.blockDifficulty, this.calculateAvgResultForExperiment(a)));
      a = null;
    });
    return avgBlockResultList;
  }

  /**
   * Calculates average trial values in given block.
   * @param {json} block 
   */
  calculateAverageTrialValuesInBlock(block) {
    var trials = block.Trials;
    var avgTrial = {
      ConditionError: [],
      CorrectResponse: [],
      OmissionError: [],
      ResponseTime: []
    };
    var result = {
      blockId: 0,
      avgConditionError: 0,
      sdConditionError: 0,
      avgCorrectResponse: 0,
      sdCorrectResponse: 0,
      avgOmissionError: 0,
      sdOmmisionError: 0,
      avgResponseTime: 0,
      sdResponseTime: 0
    };
    trials.forEach(element => {
      avgTrial.ConditionError.push(element.ConditionError);
      avgTrial.CorrectResponse.push(element.CorrectResponse);
      avgTrial.ResponseTime.push(element.ResponseTime);
      if (element.OmissionError) {
        avgTrial.OmissionError.push(1);
      } else {
        avgTrial.OmissionError.push(0);
      }
    });
    console.log(
      "Block Id: " +
        block.BlockId +
        "ConditionError: mean: " +
        stats.mean(avgTrial.ConditionError) +
        "sd: " +
        stats.stdev(avgTrial.ConditionError)
    );
    console.log(
      "Block Id: " +
        block.BlockId +
        "CorrectResponse: mean: " +
        stats.mean(avgTrial.CorrectResponse) +
        "sd: " +
        stats.stdev(avgTrial.CorrectResponse)
    );
    console.log(
      "Block Id: " +
        block.BlockId +
        "OmissionError: mean: " +
        stats.mean(avgTrial.OmissionError) +
        "sd: " +
        stats.stdev(avgTrial.OmissionError)
    );
    console.log(
      "Block Id: " +
        block.BlockId +
        "ResponseTime: mean: " +
        stats.mean(avgTrial.ResponseTime) +
        "sd: " +
        stats.stdev(avgTrial.ResponseTime)
    );
    console.log(
      "------------------------------------------------------------------------------------------------"
    );
    result.blockId = block.BlockId;
    result.avgConditionError = stats.mean(avgTrial.ConditionError);
    result.sdConditionError = stats.stdev(avgTrial.ConditionError);
    result.avgCorrectResponse = stats.mean(avgTrial.CorrectResponse);
    result.sdCorrectResponse = stats.stdev(avgTrial.CorrectResponse);
    result.avgOmissionError = stats.mean(avgTrial.OmissionError);
    result.sdOmmisionError = stats.stdev(avgTrial.OmissionError);
    result.avgResponseTime = stats.mean(avgTrial.ResponseTime);
    result.sdResponseTime = stats.mean(avgTrial.ResponseTime);
    return result;
  }
}

export default Firebase;
export { FirebaseContext };
