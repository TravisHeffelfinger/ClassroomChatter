import firebase from 'firebase'
import FIREBASE from '../keys'

const firebaseConfig = FIREBASE

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()