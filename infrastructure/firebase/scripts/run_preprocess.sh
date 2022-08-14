#!/usr/bin/env bash

cd ./functions/
echo 'Cloud Functions yarnインストール'
yarn
echo 'Cloud Functions formatter（常駐）'
yarn prettier-watch &
echo 'Cloud Functions 自動ビルド（常駐）'
yarn build:watch
