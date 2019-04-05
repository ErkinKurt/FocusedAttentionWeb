import app from "firebase/app";
import FirebaseContext from './context';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

export class Firebase{
  constructor(){
    app.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();
    
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
  createPcForDoctor = (pcName) => {
    var doctorName = this.auth.currentUser.email.split('@gmail.com')[0];
    var alias = pcName + doctorName + "@gmail.com";
    var password = "Password1.";
    this.auth.createUserWithEmailAndPassword(alias, password);
  } 

}

export default Firebase;
export {FirebaseContext};