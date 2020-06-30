import firebase from 'firebase'
import FIREBASE from '../keys'

const firebaseConfig = FIREBASE

firebase.initializeApp(firebaseConfig)

export const firebased = firebase
export const db = firebase.firestore()

