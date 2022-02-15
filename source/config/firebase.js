import firebase from '@react-native-firebase/app';
import database from "@react-native-firebase/database"
import auth from '@react-native-firebase/auth'

const firebaseConfig = {
        apiKey: "AIzaSyCDdmrYEd2Yf8d6zW253CEfpTnPmUXV_BA",
        authDomain: "iotbase-5879d.firebaseapp.com",
        databaseURL: "https://iotbase-5879d-default-rtdb.firebaseio.com",
        projectId: "iotbase-5879d",
        storageBucket: "iotbase-5879d.appspot.com",
        messagingSenderId: "608402415938",
        appId: "1:608402415938:web:f9d90de99e82097004e8db",
        measurementId: "G-0J2PGM4E5K"
};
    
// if (!firebase.apps.length) {
Firebase = firebase.initializeApp(firebaseConfig);
//      }

// let Firebase = firebase.initializeApp(firebaseConfig);
        // Initialize Firebase
export default () => {
        return {Firebase, database, auth}
};