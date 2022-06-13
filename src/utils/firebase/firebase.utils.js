import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyb4r2ST40hZ2o_Kacxp7_NNOGJOwamoI",
    authDomain: "zesuma-clothing-db.firebaseapp.com",
    projectId: "zesuma-clothing-db",
    storageBucket: "zesuma-clothing-db.appspot.com",
    messagingSenderId: "734977140122",
    appId: "1:734977140122:web:a4e8ae90c253b72de5c623"
};

const firebaseApp = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
) => {
    if(!userAuth) return
    
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }  
    }

    return userDocRef
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    
    return await signInWithEmailAndPassword(auth, email, password)
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    
    return await createUserWithEmailAndPassword(auth, email, password)
}
