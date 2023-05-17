import { addDoc, collection } from 'firebase/firestore';

import { db } from '@utils';

export const createMarker = async (marker) => {
  await addDoc(collection(db, 'marker'), marker);
};
