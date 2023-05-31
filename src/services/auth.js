import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@utils';

export const signUpAPI = async (id, password) => {
  await createUserWithEmailAndPassword(auth, id, password);
};

export const signInAPI = async (id, password) => {
  const user = await signInWithEmailAndPassword(auth, id, password);
  return user;
};
