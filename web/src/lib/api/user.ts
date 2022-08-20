import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from 'lib/infrastructure/firebase';

// 認証情報を取得
export const getUser = (): Promise<User | null> => {
  return new Promise((resolve, _) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};
