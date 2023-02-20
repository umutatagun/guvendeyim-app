// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDn0YGdrtGC06D2NIzii5WldmiLS1yXt_o",
    authDomain: "oce-auth.firebaseapp.com",
    projectId: "oce-auth",
    storageBucket: "oce-auth.appspot.com",
    messagingSenderId: "993570805932",
    appId: "1:993570805932:web:f1261b0f329180e209e709",
    databaseURL: "https://oce-auth-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
let app;
if (firebase.default.apps.length === 0) {
    app = firebase.default.initializeApp(firebaseConfig);
}else {
    app = firebase.default.app;
}

const authenticate = firebase.default.auth();

export { authenticate };

export const db = firebase.default.database(app);