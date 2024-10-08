import { firestore } from 'firebase-admin';

/**
 * コレクション削除処理
 * @param {firestore.Firestore} db
 * @param {string} collectionPath
 * @param {number} batchSize
 * @return {Promise<unknown>}
 */
export const deleteCollection = (db: firestore.Firestore, collectionPath: string, batchSize: number) => {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);
  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
};

/**
 * クエリバッチ処理
 * @param {firestore.Firestore} db
 * @param {firestore.Query<firestore.DocumentData>} query
 * @param {any} resolve
 * @return {Promise<void>}
 */
async function deleteQueryBatch(db: firestore.Firestore, query: firestore.Query<firestore.DocumentData>, resolve: any) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}
