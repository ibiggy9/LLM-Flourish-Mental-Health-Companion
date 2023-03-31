// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
import {getFirestore, Timestamp, FieldValue} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCI-TNlmwgmWB9zqg981FoCo_Yya-XcLoI",
  authDomain: "mental-health-dev-env.firebaseapp.com",
  projectId: "mental-health-dev-env",
  storageBucket: "mental-health-dev-env.appspot.com",
  messagingSenderId: "340004188318",
  appId: "1:340004188318:web:295b4b8ac7d7ed89038b8f",
  measurementId: "G-Q5M4HK9Q76"
};





export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)



export default app  