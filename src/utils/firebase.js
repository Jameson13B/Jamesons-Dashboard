import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getFirestore, collection } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
}

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig)

// DATABASE INSTANCES:
export const db = getFirestore(Firebase)
export const COLLECTIONS = {
  RECIPES_BAKING: 'dashboard-recipes-baking',
  BREW_UPDATES: 'dashboard-brew-updates',
  // Coming soon:
  // RECIPES_FAVORITE: 'dashboard-recipes-favorite',
  // BREW_RECIPES: 'dashboard-brew-recipes',
  // TRAVEL_REPORTS: 'dashboard-travel-reports',
  // TRAVEL_GROUP: 'dashboard-travel-group',
  // EATS_FAVORITES: 'dashboard-eats-favorites',
  // EATS_GROUP: 'dashboard-eats-group',
}
export const bakingDB = collection(db, COLLECTIONS.RECIPES_BAKING)
// const serverTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()
// const addArray = item => firebase.firestore.FieldValue.arrayUnion(item);
// const removeArray = item => firebase.firestore.FieldValue.arrayRemove(item);

// STORAGE INSTANCES:
// const storage = getStorage(Firebase)
