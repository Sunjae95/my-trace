import { addDoc, collection, getDocs } from 'firebase/firestore';

import { db } from '@utils';

export const createMarker = async (marker) => {
  await addDoc(collection(db, 'marker'), marker);
};

export const getMarkerList = async () => {
  const { docs } = await getDocs(collection(db, 'marker'));
  return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
