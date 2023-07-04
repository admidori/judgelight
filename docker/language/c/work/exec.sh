#!/bin/bash

COMPILECODE="${SUBMITFILENAME}.${SUBMITLANGUAGE}"

cd src
gcc "${COMPILECODE}" -o "${SUBMITFILENAME}"
RET=$?

function delete_files (){
    rm "./${SUBMITFILENAME}" \
        "${SUBMITFILENAME}.txt" \
        "${COMPILECODE}"
}

if [ $RET = 0 ]; then
    "./${SUBMITFILENAME}" > "${SUBMITFILENAME}.txt"
else
    echo "CE"
    # Return code 2 if CE
    rm "${COMPILECODE}"
    exit 2
fi

if ! diff "${SUBMITFILENAME}.txt" "./answerset/${PROBLEMID}.txt"; then
    echo "WA"
    delete_files

    # Return code 1 if WA
    exit 1
else
    echo "AC"
    delete_files

    # Return code 0 if AC
    exit 0
fi
