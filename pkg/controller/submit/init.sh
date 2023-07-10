#!/bin/sh
if [ -d ../../docker/language/c/work/src/answerset]; then
    rm -r ../../docker/language/c/work/src/answerset
fi
cd ../../settings
cp -r ./answerset ../docker/language/c/work/src
