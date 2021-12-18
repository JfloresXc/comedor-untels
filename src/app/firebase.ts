import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBOf2GNv4wIP5HpyxBlBFwuAGmiOJ0Qhds',
  authDomain: 'comidas-2021-11.firebaseapp.com',
  projectId: 'comidas-2021-11',
  storageBucket: 'comidas-2021-11.appspot.com',
  messagingSenderId: '100488768433',
  appId: '1:100488768433:web:442f48ae88beb811a0ab90',
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
