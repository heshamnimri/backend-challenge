const { serviceAccount, firebaseConfig }= require("../../config/firebaseAuth.json");

const FirebaseAdmin = require("firebase-admin");
const Firebase = require("firebase/app");
require("firebase/auth");
require("firebase/storage");
require("firebase/firestore");

global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let FirebaseBucket, Firestore

try {
    FirebaseAdmin.initializeApp({
        credential: FirebaseAdmin.credential.cert(serviceAccount)
    });
    FirebaseBucket = FirebaseAdmin.storage().bucket(firebaseConfig.storageBucket)
    Firestore = FirebaseAdmin.firestore().collection('images')

} catch (error){
    console.log('cannot connect to firebase-admin', error)
}


module.exports = { FirebaseAdmin, FirebaseBucket, Firestore };