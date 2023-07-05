#!/bin/sh
cd ../../pkg/command
if [ -d ../../settings]; then
    rm -r ../../settings
fi
cp -r ./template ../../settings
