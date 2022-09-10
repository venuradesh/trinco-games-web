import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {

    apiKey: "AIzaSyB7rguNl7_Twv1CUrSWKinKZxCJ6iiFAl8",
  
    authDomain: "trinco-games-36e79.firebaseapp.com",
  
    databaseURL: "https://trinco-games-36e79-default-rtdb.firebaseio.com",
  
    projectId: "trinco-games-36e79",
  
    storageBucket: "trinco-games-36e79.appspot.com",
  
    messagingSenderId: "587213940894",
  
    appId: "1:587213940894:web:ad317e7f7fd809a53b338f"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);

export { db }


