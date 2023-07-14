import React from "react";
import axios from "axios";

export var now

export default function Problem(){
    const [problem, SetProblem] = React.useState("");
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
        })
        .catch(function(error){
            console.log(error)
        })
    }

    React.useEffect(() => {
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
        </div>
    );
}
