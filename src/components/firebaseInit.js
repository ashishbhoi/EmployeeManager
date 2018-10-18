import firebase from 'firebase'
import 'firebase/firestore'
import firebaseComfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseComfig)
export default firebaseApp.firestore()