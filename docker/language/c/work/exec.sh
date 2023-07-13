#!/bin/bash

COMPILECODE="${SUBMITFILENAME}.${SUBMITLANGUAGE}"

function check_casefile_num (){
    local cnt=0

    for file in "${1}/*"
    do
        cnt=${cnt} + 1
    done

    return ${cnt}
}

function delete_files (){
    rm "./${SUBMITFILENAME}" \
        "${SUBMITFILENAME}.txt" \
        "${COMPILECODE}"
}

function check_files (){
    for cnt in ${2}
    do
        "./${PROBLEMID}/${1}/input.txt" > "./${SUBMITFILENAME}" > "${SUBMITFILENAME}.txt"
        if ! diff "${SUBMITFILENAME}.txt" "./${PROBLEMID}/${1}/output.txt"; then
            echo "WA"
            # Return code 1 if WA
            return 1
        fi
    done

    echo "AC"
    # Return code 0 if AC
    return 0
}

function compile (){
    gcc "${COMPILECODE}" -o "${SUBMITFILENAME}"
    RET=$?

    if [ $RET != 0 ]; then
        echo "CE"
        # Return code 2 if CE
        rm "${COMPILECODE}"
        exit 2
    fi
}

cd src
compile

CASEFILE_NUM_EXAMPLE=`check_casefile_num examplecase`
CASEFILE_NUM_TEST=`check_casefile_num testcase`

RESULT_EXAMPLE=`check_files examplecase CASEFILE_NUM_EXAMPLE`
RESULT_TEST=`check_files testcase CASEFILE_NUM_TEST`

delete_files

if [ $RESULT_EXAMPLE = 0 && $RESULT_TEST = 0 ]; then
    echo "Last Result -> AC"
    exit 0
else
    echo "Last Result -> WA"
    exit 1