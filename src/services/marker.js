import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import { db } from '@utils';

const markerReference = collection(db, 'marker');

export const createMarkerAPI = async (marker) => {
  const { id } = await addDoc(markerReference, marker);

  return { id };
};

export const updateMarkerAPI = async (id, option) => {
  await updateDoc(doc(markerReference, id), option);
};

export const getMarkerListAPI = async (userId) => {
  const { docs } = await getDocs(query(markerReference, where('userId', '==', userId)));

  return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteMarkerAPI = async (id) => {
  await deleteDoc(doc(markerReference, id));
};
