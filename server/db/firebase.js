const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../db/pcloud2gdrive-firebase-adminsdk-rib62-9be3cc386c.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db