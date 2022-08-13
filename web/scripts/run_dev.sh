#!/usr/bin/env bash

echo 'yarnインストール'
yarn

echo '保存時のコード成形（常駐）'
yarn prettier-watch &

echo 'Storybook起動（常駐）'
yarn storybook &

echo 'Webサーバ起動（開発）'
yarn dev
