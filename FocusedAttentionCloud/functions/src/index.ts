import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DocumentData } from '@google-cloud/firestore';
admin.initializeApp()
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const createBlockForPatient = functions.https.onRequest((request, response) => {
    console.log(request);
    let idToken;

    //Bearer verification..
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    }
    else {
        response.status(403).send('Unauthorized');
        return;
    }
    //idToken validation
    admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
        console.log(decodedIdToken);
        const patientId = request.get('PatientId');

        admin.firestore().collection('Patients').doc(patientId).collection("Experiments").add(request.body)
            .then(success => {
                console.log("Document created successfully.");
                response.statusCode = 200;
                response.statusMessage = 'Document Created! ';
                response.send();
            })
            .catch(error => {
                console.log('error: ' + error);
            })
    }).catch((error) => {
        console.error("Error while verifying Firebase Id Token: ", error);
        response.status(403).send("Unauthorized");
    })


});

export const getGameAdjustment = functions.https.onRequest((request, response) => {
    console.log(request);
    let idToken;

    //Bearer verification..
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    }
    else {
        response.status(403).send('Unauthorized');
        return;
    }
    //idToken validation
    admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
        console.log(decodedIdToken);
        const computerId = request.get('ComputerId');

        admin.firestore().collection('Computers').doc(computerId).get()
            .then(result => {
                response.json(result.data());
            })
            .catch(error => {
                console.log('error: ' + error);
            })
    }).catch((error) => {
        console.error("Error while verifying Firebase Id Token: ", error);
        response.status(403).send("Unauthorized");
    })


});

export const getAllExperiments = functions.https.onRequest((request, response) => {
   
    let allExperiments: DocumentData | undefined[] = [];
    let idToken;
    //Bearer verification..
    // if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
    //     idToken = request.headers.authorization.split('Bearer ')[1];
    // }
    // else {
    //     response.status(403).send('Unauthorized');
    //     return;
    // }
    idToken = "P7aF2oPO1aOXfIzaV4nbpN43xWr1"
    admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
        admin.firestore().collection("Patients").get().then(QuerySnapshot => {
            QuerySnapshot.docs.map(documentSnapshot => {
                admin.firestore().collection("Patients").doc(documentSnapshot.id).collection("Experiments").get().then(result => {
                result.docs.map(documentS => {
                    admin.firestore().collection("Patients").doc(documentSnapshot.id).collection("Experiments").doc(documentS.id).get().then(resultData => {
                        allExperiments.push(resultData.data());
                  });
                })
              });
            })
          }).then(() => {
              console.log("Inside promise: ");
            console.log(allExperiments);
            response.json(allExperiments);
        })
    }).catch(error => {
        console.error("Error while verifying Id Token: ", error);
        response.status(403).send("Unauthorized");
    })
    console.log("Result array: ");
    
});
