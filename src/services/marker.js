import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

import { db } from '@utils';

const markerReference = collection(db, 'marker');

export const createMarkerAPI = async (marker) => {
  await addDoc(markerReference, marker);
};

export const updateMarkerAPI = async (id, option) => {
  await updateDoc(doc(markerReference, id), option);
};

export const getMarkerListAPI = async () => {
  const { docs } = await getDocs(markerReference);

  return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteMarkerAPI = async (id) => {
  await deleteDoc(doc(markerReference, id));
};
