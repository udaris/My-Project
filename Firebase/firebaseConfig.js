import Firebase from 'firebase';

//import "firebase/firestore";

const firebaseConfig={
    apiKey:"AIzaSyDR7mYR5XfmxCM0xOQ1Hf64j0YoXT7aPTg",
    databaseURL:"https://projet02l2l1-default-rtdb.firebaseio.com/",
    projectId:"projet02l2l1",
    appId:"1:939254909643:android:fba43137e1d07fc46c694e",
};
 


export default Firebase.initializeApp(firebaseConfig);
