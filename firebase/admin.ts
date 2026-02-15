import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let auth: any = null;
let db: any = null;

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  // Check if env variables exist
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    console.log("Firebase Admin not configured. Running without Firebase.");
    return { auth: null, db: null };
  }

  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

const firebaseAdmin = initFirebaseAdmin();

auth = firebaseAdmin.auth;
db = firebaseAdmin.db;

export { auth, db };
