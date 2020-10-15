import firebase from 'firebase'
//import FIREBASE from '../keys'

const FIREBASE = {
    apiKey: "AIzaSyAHzS-BpuOpzmNVs6fcyGwP5_9C-38tx-g",
    authDomain: "classroomchatter-a7f90.firebaseapp.com",
    databaseURL: "https://classroomchatter-a7f90.firebaseio.com",
    projectId: "classroomchatter-a7f90",
    storageBucket: "classroomchatter-a7f90.appspot.com",
    messagingSenderId: "416988184247",
    appId: "1:416988184247:web:e25ee91765ef93607ed732",
    measurementId: "G-CR305YY5T9"
}

const firebaseConfig = FIREBASE

firebase.initializeApp(firebaseConfig)

export const firebased = firebase
export const db = firebase.firestore()

