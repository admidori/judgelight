#!/bin/bash
COMPILECODE="${SUBMITFILENAME}.${SUBMITLANGUAGE}"

cd src
gcc "${COMPILECODE}" -o "${SUBMITFILENAME}"
RET=$?
touch test.c

if [ $RET = 0 ]; then
    "./${SUBMITFILENAME}" > "${SUBMITFILENAME}.txt"
else
    echo "CE"
    # Return code 2 if CE
    exit 2
fi

if ! diff "${SUBMITFILENAME}.txt" "./answerset/${SUBMITFILENAME}.txt"; then
    echo "WA"
    # Return code 1 if WA
    exit 1
else
    echo "AC"
    # Return code 0 if AC
    exit 0
fi
