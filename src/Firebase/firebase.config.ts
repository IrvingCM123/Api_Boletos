import * as firebaseAdminConfig from '../Archive/guadalajara-17336-firebase-adminsdk-d082c-9e5f485c79.json';
import admin from "firebase-admin";

let storageBucket = require("../Archive/firebase-image.json");
let serviceAccount = require("../Archive/guadalajara-17336-firebase-adminsdk-d082c-9e5f485c79.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: storageBucket.storageBucket,
});

export const firebaseAdmin = admin;
