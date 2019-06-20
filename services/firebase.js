import firebase from 'firebase'
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8FOI6E5tQKBzo0jeJdcIW14tIP-fTIvA",
    authDomain: "nuxt-a6f51.firebaseapp.com",
    databaseURL: "https://nuxt-a6f51.firebaseio.com",
    projectId: "nuxt-a6f51",
    storageBucket: "nuxt-a6f51.appspot.com",
    messagingSenderId: "395885112820"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const db = firebase.firestore()
const storage = firebase.storage().ref()
const auth = firebase.auth()

export default firebase
export {
    db,
    storage,
    auth
}