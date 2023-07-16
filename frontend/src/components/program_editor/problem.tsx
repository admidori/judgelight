import React from "react";
import axios from "axios";

export var now

export default function Problem(){
    const [problem, SetProblem] = React.useState("");
    const [exampleInput, SetExampleInput] = React.useState([]);
    const [exampleOutput, SetExampleOutput] = React.useState([]);
    const [exampleNumber, SetExampleNumber] = React.useState(0);

    const [problemNumber, SetProblemNumber] = React.useState(1)
    const [nowProblem, SetNowProblem] = React.useState(0)

    const handleListClick = (num) => {
        SetNowProblem(num)
        now = String(num)

        axios.get("http://localhost:8080/problem",{
            params: {
                problemNumber: num,
            }
        })
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response));
            SetProblem(responseJsonData.data.problem)
            SetExampleNumber(responseJsonData.data.exampleNum)

            var input = Array(exampleNumber);
            var output = Array(exampleNumber);
            for (let i=0;i<exampleNumber;i++){
                input[i] = responseJsonData.data.exampleInputData[i]
                output[i] = responseJsonData.data.exampleOutputData[i]
            }

            SetExampleInput(input)
            SetExampleOutput(output)
            console.log(exampleInput)
            console.log(exampleOutput)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    React.useEffect(() => {
        /*
        const fs = require('fs')
        const hostDomain = JSON.parse(fs.readFileSync("config.json", "UTF-8"))
        */
        axios.get("http://localhost:8080/paramater", {
            params: {
                paramater: "NumberOfProblem",
            }
        })
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response));
            SetProblemNumber(responseJsonData.data.paramater)
        })
        .catch(function(error){
            console.log(error)
        })
    }, []);

    return(
        <div>
            {
            (function () {
                const list = [];
                for (let i = 1; i <= Number(problemNumber); i++) {
                    list.push(<li onClick= {() => handleListClick(i)}style={{ display: 'inline', listStyle: 'none' }}>{i}</li>);
                }
                return <ul>{list}</ul>;
            }())
            }
            <h2>Problem {nowProblem}</h2>
            <p>{problem}</p>

            {
            (function () {
                const list = [];
                for (let i = 0; i < Number(exampleNumber); i++) {
                    list.push(<hr></hr>)
                    list.push(<p style={{fontSize: 12}}>入力例{i+1}</p>)
                    list.push(<p style={{fontFamily: '"Fira code", "Fira Mono", monospace',fontSize: 12,}}>{exampleInput[i]}</p>);
                    list.push(<p style={{fontSize: 12}}>出力例{i+1}</p>)
                    list.push(<p style={{fontFamily: '"Fira code", "Fira Mono", monospace',fontSize: 12,}}>{exampleOutput[i]}</p>)
                }
                return <p>{list}</p>;
            }())
            }
        </div>
    );
}
