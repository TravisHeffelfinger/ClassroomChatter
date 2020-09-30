import { firebased } from '../services/firebase'

export function signUpWithEmail(email, password) {
    return firebased.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        console.log('Sign up with email failed' ,error)
    })
}

export function loginWithEmail(email, password){
    return firebased.auth().signInWithEmailAndPassword(email, password).catch(error => {console.log(error)})
}

export function signInWithGoogle() {
    let provider = new firebased.auth.GoogleAuthProvider()
    return firebased.auth().signInWithPopup(provider)
}

export function logOut() {
    return firebased.auth().signOut()
}