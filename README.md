# TASKOO

[![Test & Deploy Web](https://github.com/undefeated-davout/taskoo/actions/workflows/test-deploy-web.yml/badge.svg)](https://github.com/undefeated-davout/taskoo/actions/workflows/test-deploy-web.yml)

[![Test & Deploy Cloud Functions](https://github.com/undefeated-davout/taskoo/actions/workflows/test-deploy-functions.yml/badge.svg)](https://github.com/undefeated-davout/taskoo/actions/workflows/test-deploy-functions.yml)

## 起動

```bash
# 開発環境起動
docker compose -f ./docker-compose-dev.yml up -d

# FES用コンテナにログイン
docker exec -it taskoo.firebase bash
# 以下のコマンで[Firebase CLI が Google アカウントへのアクセスをリクエストしています]に許可
firebase login
# FES実行
./infrastructure/firebase/scripts/run_firebase_emulators.sh
```
