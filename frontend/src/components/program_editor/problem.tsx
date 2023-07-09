import React from "react";
import axios from "axios";
import { error } from "console";

export default function Problem(){
    const [problem, SetProblem] = React.useState("");
    const [problemNumber, SetProblemNumber] = React.useState(1)
    
    axios.get("http://localhost:8080/paramater", {
        params: {
            paramater: "number-of-problem",
        }
    })
    .then(function(response){
        const responseJsonData = JSON.parse(JSON.stringify(response));
        SetProblemNumber(responseJsonData.data.return)
    })
    .catch(function(error){
        console.log(error)
    })

    return(
        <div>
            {
            (function () {
                const list = [];
                for (let i = 1; i <= Number(problemNumber); i++) {
                list.push(<li>{i}</li>);
                }
                return <ul>{list}</ul>;
            }())
            }
            <p>Problem {problemNumber}</p>
            <p></p>
        </div>
    );
}