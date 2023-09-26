import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBPekW8V46tdOT6V1mClUTbN_KLr3ra6xE',
  authDomain: 'project-x-5f28b.firebaseapp.com',
  projectId: 'project-x-5f28b',
  storageBucket: 'project-x-5f28b.appspot.com',
  messagingSenderId: '419631228768',
  appId: '1:419631228768:web:e567dcc75f2eb59f45e005',
}

export const app = initializeApp(FIREBASE_CONFIG)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
