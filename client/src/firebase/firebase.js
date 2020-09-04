import firebase from 'firebase/app'
import 'firebase/storage'

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
firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export { storage, firebase as default }
