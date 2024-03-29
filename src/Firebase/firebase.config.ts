import * as firebaseAdminConfig from '../Archive/guadalajara-17336-firebase-adminsdk-d082c-9e5f485c79.json';
import admin from "firebase-admin";

let firebaseA = firebaseAdminConfig;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: firebaseA.project_id,
    privateKey: firebaseA.private_key,
    clientEmail: firebaseA.client_email,
  
  }),
  storageBucket: "guadalajara-17336.appspot.com",
});

export const firebaseAdmin = admin;
