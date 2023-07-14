#!/bin/bash
#PROBLEMID="2"
#SUBMITFILENAME="1"
#SUBMITLANGUAGE="c"

COMPILECODE="${SUBMITFILENAME}.${SUBMITLANGUAGE}"

function check_casefile_num (){
    local rtn=$(ls -l "./case/${PROBLEMID}/${1}/" | grep ^d | wc -l)
    return ${rtn}
}

function delete_files (){
    rm  "./${SUBMITFILENAME}.out" \
        "./${COMPILECODE}" \
        "./${SUBMITFILENAME}.txt"
}

function check_files (){
    local cnt=0

    for cnt in `seq 1 ${2}`
    do
        "./${SUBMITFILENAME}.out" < "./case/${PROBLEMID}/${1}/${cnt}/input.txt" > "./${SUBMITFILENAME}.txt"
        if ! diff "./${SUBMITFILENAME}.txt" "./case/${PROBLEMID}/${1}/${cnt}/output.txt"; then
            echo "WA"
            # Return code 1 if WA
            return 1
        fi
    done

    echo "AC"
    # Return code 0 if AC
    return 0
}

# Compile a submit code
cd src
gcc -o "${SUBMITFILENAME}.out" "${COMPILECODE}" 
RET=$?

if [ $RET != 0 ]; then
    echo "CE"
    # Return code 2 if CE
    rm "${COMPILECODE}"
    exit 2
fi

check_casefile_num "examplecase"
CASEFILE_NUM_EXAMPLE=$?
check_casefile_num "testcase"
CASEFILE_NUM_TEST=$?

check_files "examplecase" ${CASEFILE_NUM_EXAMPLE}
RESULT_EXAMPLE=$?
check_files "testcase" ${CASEFILE_NUM_TEST}
RESULT_TEST=$?

delete_files

if [ ${RESULT_EXAMPLE} = 0 ] && [ ${RESULT_TEST} = 0 ]; then
    echo "Last Result -> AC"
    exit 0
else
    echo "Last Result -> WA"
    exit 1
fi
