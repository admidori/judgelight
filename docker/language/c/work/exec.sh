#!/bin/bash

#SUBMITFILENAME="ZZtwR"
#SUBMITLANGUAGE="c"
#DATA=$'#include<stdio.h>\nint main(void){\n  int a,b;\n  scanf(\"%d %d\",&a,&b);\n  printf(\"%d\\n\",a+b);\n  return 0;\n}'
#TESTCASEJSON='[{"Input":"2 1\\n","Output":"3\\n"},{"Input":"5 6\\n","Output":"11\\n"}]'
#SECRETCASEJSON='[{"Input":"2 2\\n","Output":"4\\n"},{"Input":"0 10\\n","Output":"10\\n"},{"Input":"22 2\\n","Output":"24\\n"}]'

COMPILECODE="data.${SUBMITLANGUAGE}"

while read i; do
    TESTCASEINPUT+=( "$(jq -r '.Input' <<< "${i}")" )
    TESTCASEOUTPUT+=( "$(jq -r '.Output' <<< "${i}")" )
done < <(jq -c '.[]' <<< "${TESTCASEJSON}")

while read i; do
    SECRETCASEINPUT+=( "$(jq -r '.Input' <<< "${i}")" )
    SECRETCASEOUTPUT+=( "$(jq -r '.Output' <<< "${i}")" )
done< <(jq -c '.[]' <<< "${SECRETCASEJSON}")

function create_files (){
    mkdir -p "./${SUBMITFILENAME}/testcase/input"
    mkdir -p "./${SUBMITFILENAME}/testcase/output"
    mkdir -p "./${SUBMITFILENAME}/secretcase/input"
    mkdir -p "./${SUBMITFILENAME}/secretcase/output"
    echo "${DATA}" > "./${SUBMITFILENAME}/${COMPILECODE}"

    for d in "${!TESTCASEINPUT[@]}"; do
        echo "${TESTCASEINPUT[$d]}" > "./${SUBMITFILENAME}/testcase/input/${d}.txt"
    done
    for d in "${!TESTCASEOUTPUT[@]}"; do
        echo "${TESTCASEOUTPUT[$d]}" > "./${SUBMITFILENAME}/testcase/output/${d}.txt"
    done
    for d in "${!SECRETCASEINPUT[@]}"; do
        echo "${SECRETCASEINPUT[$d]}" > "./${SUBMITFILENAME}/secretcase/input/${d}.txt"
    done
    for d in "${!SECRETCASEOUTPUT[@]}"; do
        echo "${SECRETCASEOUTPUT[$d]}" > "./${SUBMITFILENAME}/secretcase/output/${d}.txt"
    done
}

function delete_files (){
    rm -r "./${SUBMITFILENAME}"
}

create_files

# Compile a submit code
gcc -o "./${SUBMITFILENAME}/execution.out" "./${SUBMITFILENAME}/${COMPILECODE}"
RET=$?

if [ $RET != 0 ]; then
    echo "CE"
    # Return code 2 if CE
    rm -r "./${SUBMITFILENAME}"
    exit 2
fi

index=0
for cnt in "${TESTCASEINPUT[@]}"; do
    BOOLDATA=0
    "./${SUBMITFILENAME}/execution.out" < "./${SUBMITFILENAME}/testcase/input/${index}.txt" > "./${SUBMITFILENAME}/output.txt"
    if ! diff "./${SUBMITFILENAME}/output.txt" "./${SUBMITFILENAME}/testcase/output/${index}.txt"; then
        RESULT_TEST=1
        break
    fi
    BOOLDATA=1
    let index++
done

if [ ${BOOLDATA} = 0 ]; then
    echo "TestCase:WA"
    RESULT_TEST=1
fi
if [ ${BOOLDATA} = 1 ]; then
    echo "TestCase:AC"
    RESULT_TEST=0
fi

index=0
for cnt in "${SECRETCASEINPUT[@]}"; do
    BOOLDATA=0
    "./${SUBMITFILENAME}/execution.out" < "./${SUBMITFILENAME}/secretcase/input/${index}.txt" > "./${SUBMITFILENAME}/output.txt"
    if ! diff "./${SUBMITFILENAME}/output.txt" "./${SUBMITFILENAME}/secretcase/output/${index}.txt"; then
        RESULT_TEST=1
        break
    fi
    BOOLDATA=1
    let index++
done

if [ ${BOOLDATA} = 0 ]; then
    echo "SecretCase:WA"
    RESULT_SECRET=1
fi
if [ ${BOOLDATA} = 1 ]; then
    echo "SecretCase:AC"
    RESULT_SECRET=0
fi

delete_files

if [ ${RESULT_TEST} = 0 ] && [ ${RESULT_SECRET} = 0 ]; then
    echo "Last Result -> AC"
    exit 0
else
    echo "Last Result -> WA"
    exit 1
fi
