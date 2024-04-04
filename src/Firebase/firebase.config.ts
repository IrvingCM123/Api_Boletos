import * as firebaseAdminConfig from '../Archive/guadalajara-17336-firebase-adminsdk-d082c-9e5f485c79.json';
import admin from "firebase-admin";

// Stores the Firebase Admin configuration
let firebaseA = firebaseAdminConfig;


// Initializes the Firebase Admin application with the provided credentials
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: firebaseA.project_id,
    privateKey: firebaseA.private_key,
    clientEmail: firebaseA.client_email,
  
  }),
  storageBucket: "guadalajara-17336.appspot.com",
});

// Exports the Firebase Admin instance for use in other parts of the application.
export const firebaseAdmin = admin;
