import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@utils';

export const signUpAPI = async (id, password) => {
  await createUserWithEmailAndPassword(auth, id, password);
};
