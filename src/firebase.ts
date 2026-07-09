import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0004509110",
  appId: "1:75178875403:web:c78a43bc317ea14e5ac50e",
  apiKey: "AIzaSyA9dwwEXl0EvRf3TxYCxsUjF0fv19eMrgc",
  authDomain: "gen-lang-client-0004509110.firebaseapp.com",
  storageBucket: "gen-lang-client-0004509110.firebasestorage.app",
  messagingSenderId: "75178875403"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-thebigkickoffaff-cbc93280-fbff-46c3-ad09-7c48408d83ca");

export async function addNewsletterSubscriber(email: string) {
  try {
    const docRef = await addDoc(collection(db, "newsletter_subscribers"), {
      email,
      subscribedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding newsletter subscriber: ", error);
    throw error;
  }
}

export async function addBundleWaitlist(email: string) {
  try {
    const docRef = await addDoc(collection(db, "bundle_waitlist"), {
      email,
      joinedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding bundle waitlist: ", error);
    throw error;
  }
}
