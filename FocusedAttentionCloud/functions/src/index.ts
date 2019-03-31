import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
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

        admin.firestore().collection('Patients').doc(patientId).set(request.body)
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
