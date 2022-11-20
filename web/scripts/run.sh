#!/usr/bin/env bash

echo 'yarn install'
yarn

echo 'build Web server'
yarn build

echo 'run Web server(prod)'
yarn start
