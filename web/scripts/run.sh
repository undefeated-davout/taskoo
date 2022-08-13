#!/usr/bin/env bash

echo 'yarnインストール'
yarn

echo 'Webサーバビルド'
yarn build

echo 'Webサーバ起動（本番）'
yarn start
