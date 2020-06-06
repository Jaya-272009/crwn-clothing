import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyC6SO67hMYU6p0fqQwl6d_tNpQBGSzbxCU",
    authDomain: "crwn-db-85de4.firebaseapp.com",
    databaseURL: "https://crwn-db-85de4.firebaseio.com",
    projectId: "crwn-db-85de4",
    storageBucket: "crwn-db-85de4.appspot.com",
    messagingSenderId: "249906153492",
    appId: "1:249906153492:web:3cd192b4c405c06daaff01",
    measurementId: "G-4J2MXMD47H"
  };;


  export const createUserProfileDocument = async (userAuth , additionalData) => {
    if(!userAuth) return;

    const userRef =firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
      const {displayName,email}=userAuth;
      const createdAt =new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export const firestore = firebase.firestore();

  const provider= new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = () =>auth.signInWithPopup(provider);

  export default firebase;