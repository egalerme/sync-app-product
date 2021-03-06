import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyB9wpsep3ZJ9YWzsCtGr1_K69L9D0bpsyI',
  authDomain: 'sync-app-product.firebaseapp.com',
  databaseURL: 'https://sync-app-product.firebaseio.com',
  projectId: 'sync-app-product',
  storageBucket: 'sync-app-product.appspot.com',
  messagingSenderId: '942779882146',
  appId: '1:942779882146:web:ce9881b532578c899995fb',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertSuppliersSnapshotToMap = suppliers => {
  const transformedCollection = suppliers.docs.map(doc => {
    const { name, priceLists } = doc.data();

    return {
      id: doc.id,
      name,
      priceLists,
    };
  });

  return transformedCollection.reduce((accumulator, supplier) => {
    accumulator[supplier.title.toLowerCase()] = supplier;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
