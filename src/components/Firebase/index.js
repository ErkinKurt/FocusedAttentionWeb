import app from "firebase/app";
import FirebaseContext from './context';
import 'firebase/auth';
import 'firebase/firestore';
import * as stats from "stats-lite";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

export class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();

    //Crud app instantiation...
    this.crudApp = app.initializeApp(config, "crud");

    this.crudAuth = this.crudApp.auth();
    this.password = "Password1.";
    this.ClinicId = "Tesla";

    //Experiments...
    //Kod leş oldu. SOLID Principle ile gram alakası yok. Pu ak... Yetiştirmemiz lazım ama ... degil
    this.ExperimentResults = [];
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  //Firebase Util   

  //Set GameAdjustment to Given Pc...
  //Parameters GameAdjustment and PcId (DocumentId)
  setGameAdjustmentForPc(gameAdjustmentObject, pcId){
    this.firestore.collection("Computers").doc(pcId).update({
      GameAdjustment: gameAdjustmentObject
    }).then((success) => {
      console.log("Game adjustment successfully updated." + success);
    }).catch((error) => {
      console.log("Error during updating GameAdjustment" + error);
    })
  }

  //Get All pc for clinic..
  getAllPcForClinic = (clinicId) => {
    //ClinicId is fixed. We can change the implementation later Clinic is in charge. 
    return this.firestore.collection("Computers").where("ClinicId", "==", this.ClinicId).get();
  }

  //Insert computer into Cloudstore.. ClinicId is hardcodded.
  createPcInFirestore = (clinicId, uid, pcName) => {
    this.firestore.collection("Computers").doc(uid).set({
      ClinicId: clinicId,
      PcName: pcName,
      GameAdjustment: {}
    });
  }

  ///<summary>Create pc with authenticated user's alies.</summary>
  ///<param name="pcName" dataType="string"> Name of the pc.</param>
  createPcForDoctor = (pcName) => {
    var doctorName = this.auth.currentUser.email.split('@gmail.com')[0];
    var alias = pcName + doctorName + "@gmail.com";
    this.crudAuth.createUserAndRetrieveDataWithEmailAndPassword(alias, this.password)
      .then(response => {
        console.log("Create pc response: " + response);
        //Creating Pc in database...
        this.createPcInFirestore(this.ClinicId, this.crudAuth.currentUser.uid, alias);
        this.crudAuth.signOut();
        return true;
      })
      .catch(error => {
        console.log("Error during creating Pc for doctor: " + error);
        return false;
      })
  }

  //Get all patients for authenticated doctor. Returns QuerySnapshot..
  //QuerySnapshot.data() will get the related document in json format.
  //Returns promise. Use .then() to resolve and .catch() to handle error.
  getAllPatientsForDoctor = () => {
    if (this.auth.currentUser === null) return null;
    else {
      var doctorId = this.auth.currentUser.uid;
      return this.firestore.collection("Doctors").doc(doctorId).collection("Patients").get();
    }
  }

  //Get all experiments of the given patientId. 
  //Need to figure out what will be the query types? Do we wanna get specific experiment?
  //Do we need to get all experiments?
  getAllExperimentsWithPatientId = (patientId) => {
    return this.firestore.collection("Patients").doc(patientId).collection("Experiments").get();
  }

  //Get all experiments of the given patientId and gameScenario
  getAllExperimentsWithPatientIdandGameScenario(patientId, gameScenario){
    return this.firestore.collection("Patients").doc(patientId).collection("Experiments").where("GameId", "==", gameScenario).get();
  }

  ///<summary>Create patients for authenticated doctor.</summary>
  ///<param name="patient" dataType="json"> Patient object.</param>
  createPatientForDoctor = (patient) => {
    if (patient !== null && patient.email !== null && this.auth.currentUser !== null) {
      var doctorId = this.auth.currentUser.uid;
      var patientEmail = patient.email;
      this.crudAuth.createUserWithEmailAndPassword(patientEmail, this.password)
        .then(() => {
          var patientId = this.crudAuth.currentUser.uid;
          this.firestore.collection("Doctors").doc(doctorId).collection("Patients").doc(patientId)
            .set(patient)
            .then(resolve => {
              console.log(resolve);
              this.crudAuth.signOut();
            })
            .catch(error => console.log("Error on adding patient to db." + error))
        }).catch(error => console.log("Error on creating patient." + error))
    }
    else {
      console.log("No patient passed during create patient method.");
    }
  }

  //Calculate Patient Statistics. In an experiment

  getAllExperimentResults(){
    return this.ExperimentResults;
  }

  processAllExperiments(experiments){
    this.ExperimentResults.length = 0;
    experiments.forEach(experiment => {
      this.ExperimentResults.push(this.processAnExperiment(experiment));
    });
  }

  //Calculate avgBlocks mean and sd for total experiment.
  calculateAvgResultForExperiment(avgBlocks){
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
      avgResponseTime:0,
      sdResponseTime: 0,
    };
    avgBlocks.forEach(block => {
      result.ConditionError.push(block.avgConditionError);
      result.CorrectResponse.push(block.avgCorrectResponse);
      result.OmissionError.push(block.avgOmissionError);
      result.ResponseTime.push(block.avgResponseTime);
    })
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

  processAnExperiment(experiment){
    var experimentToPush = {
      experimentId: "",
      avgBlocks: [],
      avgResult: {}
    };

    var blockList = experiment.BlockList;
    experimentToPush.experimentId = experiment.GameId;
    blockList.forEach(block => {
      experimentToPush.avgBlocks.push(this.calculateAverageTrialValuesInBlock(block));
    });
    experimentToPush.avgResult = this.calculateAvgResultForExperiment(experimentToPush.avgBlocks);
   
    return experimentToPush;
  }

  calculateAverageTrialValuesInBlock(block){
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
      avgResponseTime:0,
      sdResponseTime: 0,
    }
    trials.forEach(element => {
      avgTrial.ConditionError.push(element.ConditionError);
      avgTrial.CorrectResponse.push(element.CorrectResponse);
      avgTrial.ResponseTime.push(element.ResponseTime);
      if(element.OmissionError){
        avgTrial.OmissionError.push(1);
      }
      else{
        avgTrial.OmissionError.push(0);
      }
    });
    console.log("Block Id: " + block.BlockId + "ConditionError: mean: " + stats.mean(avgTrial.ConditionError) + "sd: " + stats.stdev(avgTrial.ConditionError));
    console.log("Block Id: " + block.BlockId + "CorrectResponse: mean: " + stats.mean(avgTrial.CorrectResponse)+ "sd: " + stats.stdev(avgTrial.CorrectResponse));
    console.log("Block Id: " + block.BlockId + "OmissionError: mean: " + stats.mean(avgTrial.OmissionError)+ "sd: " + stats.stdev(avgTrial.OmissionError));
    console.log("Block Id: " + block.BlockId + "ResponseTime: mean: " + stats.mean(avgTrial.ResponseTime)+ "sd: " + stats.stdev(avgTrial.ResponseTime));
    console.log("------------------------------------------------------------------------------------------------");
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