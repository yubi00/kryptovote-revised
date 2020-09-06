import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firebase-functions'

const firebaseConfig = {
  apiKey: 'AIzaSyAKHmfOLSTO0B9OBEpGdROViUGhCdDXsos',
  authDomain: 'kryptovote.firebaseapp.com',
  databaseURL: 'https://kryptovote.firebaseio.com',
  projectId: 'kryptovote',
  storageBucket: 'kryptovote.appspot.com',
  messagingSenderId: '290819388595',
  appId: '1:290819388595:web:53b190412b04ad7be02cc6',
  measurementId: 'G-TTPW92W2FM'
}
const app = firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
const firebaseAuth = firebase.auth(app)
const functions = firebase.functions()

export { firebaseAuth, functions, storage, firebase as default }
