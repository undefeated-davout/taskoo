import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';

import { deleteCollection } from './lib/firestore/delete';

// デフォルト設定済みFunctions
const defaultFunctions = functions.region('asia-northeast1');
// Firestore接続情報作成
const db = admin.initializeApp().firestore();

// 初回認証時処理
// Userドキュメントを作成する
export const createUser = defaultFunctions.auth
  .user()
  .onCreate(async (user: admin.auth.UserRecord) => {
    let result = 'error';
    let message = 'function failed';

    // // CustomClaimsをセット
    // admin.auth().setCustomUserClaims(user.uid, {});

    const mainFunc = async (user: admin.auth.UserRecord) => {
      await db.collection('users').doc(user.uid).set({
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      return true;
    };
    const isSuccess = await mainFunc(user);
    if (isSuccess) {
      result = 'success';
      message = 'user created';
    }
    functions.logger.info('result:', result);
    return { result, message };
  });

// 認証削除時処理
// 該当ユーザのドキュメント配下全て削除する
export const deleteUser = defaultFunctions.auth
  .user()
  .onDelete(async (user: admin.auth.UserRecord) => {
    let result = 'error';
    let message = 'function failed';
    const mainFunc = async (user: admin.auth.UserRecord) => {
      // タスク削除
      await deleteCollection(
        db,
        db.collection('users').doc(user.uid).collection('tasks').path,
        500,
      );
      // 最後にユーザ削除
      await db.collection('users').doc(user.uid).delete();
      return true;
    };
    const isSuccess = await mainFunc(user);
    if (isSuccess) {
      result = 'success';
      message = 'user created';
    }
    functions.logger.info('result:', result);
    return { result, message };
  });
