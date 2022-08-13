#!/usr/bin/env bash

echo 'Firebase Emulator Suite起動（常駐）'
firebase emulators:start --import ./_shared_storage/firebase --export-on-exit
