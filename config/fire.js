import * as firebase from 'firebase';

 var firebaseConfig = {
    apiKey: "AIzaSyCdpjIVF8eghoybcVrd-R2xrIIwxrTT87s",
    authDomain: "tutorapp-1fb1f.firebaseapp.com",
    databaseURL: "https://tutorapp-1fb1f.firebaseio.com",
    projectId: "tutorapp-1fb1f",
    storageBucket: "tutorapp-1fb1f.appspot.com",
    messagingSenderId: "815400909950",
    appId: "1:815400909950:web:6c66b52c9f6f025308ac2f"
  };

  const fire=firebase.initializeApp(firebaseConfig);
  export default fire;