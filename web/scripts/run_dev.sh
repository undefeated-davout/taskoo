#!/usr/bin/env bash

echo 'yarn install'
yarn

echo 'run code formatter'
yarn prettier-watch &

echo 'run Storybook'
yarn storybook &

echo 'run Web server(dev)'
yarn dev
