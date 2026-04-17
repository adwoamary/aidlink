import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

// This file is the app's single Firebase entry point.
// Put your Expo public environment values in `.env`, for example:
// EXPO_PUBLIC_FIREBASE_API_KEY=...
// EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
// EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
// EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
// EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
// EXPO_PUBLIC_FIREBASE_APP_ID=...
//
// Expo exposes only variables prefixed with `EXPO_PUBLIC_` to the app.

export type FirebaseConfig = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
};

export const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// This list makes it easy to explain why Firebase is not ready yet.
const requiredFirebaseKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
] satisfies Array<keyof FirebaseConfig>;

export function isFirebaseConfigured() {
  return getMissingFirebaseConfigKeys().length === 0;
}

export function getMissingFirebaseConfigKeys(): Array<keyof FirebaseConfig> {
  return requiredFirebaseKeys.filter((key) => !firebaseConfig[key]);
}

function createFirebaseServices() {
  if (!isFirebaseConfigured()) {
    return {
      firebaseApp: null,
      firestore: null,
    };
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  return {
    firebaseApp: app,
    firestore: getFirestore(app),
  };
}

const firebaseServices = createFirebaseServices();

export const firebaseApp: FirebaseApp | null = firebaseServices.firebaseApp;
export const firestore: Firestore | null = firebaseServices.firestore;
