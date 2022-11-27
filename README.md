# TASKOO

[![Test & Deploy Web](https://github.com/undefeated-davout/taskoo/actions/workflows/test-deploy-web.yml/badge.svg)](https://github.com/undefeated-davout/taskoo/actions/workflows/test-deploy-web.yml)

[![Test & Deploy Functions](https://github.com/undefeated-davout/taskoo/actions/workflows/test-deploy-functions.yml/badge.svg)](https://github.com/undefeated-davout/taskoo/actions/workflows/test-deploy-functions.yml)

## 準備

- ./web/.env.localファイルを用意（内容は./web/.env.sampleを参考）

## 起動

```bash
# 開発環境起動
docker compose -f ./docker-compose-dev.yml up -d

# Firebaseログイン
docker exec -it taskoo.firebase
firebase login

# Firebase Emulator Suite起動（自動起動するとシャットダウン時のexport機能が動作しないため手動起動）
docker compose -f ./docker-compose-dev.yml up -d firebase; docker exec -it taskoo.firebase ./infrastructure/firebase/scripts/run_firebase_emulators.sh

# webサーバ起動
cd web/
./scripts/run_dev.sh

// http://0.0.0.0:5001/taskoo-davout-v1/asia-northeast1/helloWorld
// https://asia-northeast1-taskoo-davout-v1.cloudfunctions.net/helloWorld
```

## 設定

```bash
# Firestore indexes export
mkdir -p ./tmp/ && \
  firebase firestore:indexes > ./tmp/firestore.indexes.json && \
  mv ./tmp/firestore.indexes.json infrastructure/firebase/firestore.indexes.json
```

## デプロイ

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```
