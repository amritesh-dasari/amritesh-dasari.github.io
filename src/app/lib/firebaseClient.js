import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const missingKeys = Object.entries({
  NEXT_PUBLIC_FIREBASE_API_KEY: firebaseConfig.apiKey,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
  NEXT_PUBLIC_FIREBASE_APP_ID: firebaseConfig.appId,
}).filter(([, value]) => !value)
  .map(([key]) => key)

export const hasFirebaseConfig = missingKeys.length === 0
export const missingFirebaseKeys = missingKeys

let firestoreDb = null

export const getFirestoreDb = () => {
  if (firestoreDb) return firestoreDb

  if (!hasFirebaseConfig) {
    throw new Error(
      `Missing Firebase config values: ${missingFirebaseKeys.join(", ")}`
    )
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  firestoreDb = getFirestore(app)
  return firestoreDb
}
