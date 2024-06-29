import React from "react";
import Menu from "./menu";
import Description from "./description";
import Case from "./case";
import Title from "./title";
import Appendix from "./appendix";
import Limitation from "./limitation";
import { handleGetProblemTotalNumber, handleGetProblemCaseTotalNumber, handleTitle, handleDescription, handleAppendix, handleLimitation, handleCase } from "./hooks";
import { ProblemNumberContext } from "../../provider/problemNumber";

export default function Problem(){
    const [problemNumber, setProblemNumber] = React.useContext(ProblemNumberContext)
    const handleNowProblemChange = (number) => {
        setProblemNumber(number)
    }
    
    const problemTotalNumber = handleGetProblemTotalNumber()
    const problemCaseTotalNumber = handleGetProblemCaseTotalNumber(problemNumber)
    const { problemTitle } = handleTitle(problemNumber)
    const problemDescription = handleDescription(problemNumber)
    const { problemAppendix } = handleAppendix(problemNumber)
    const { problemLimitation} = handleLimitation(problemNumber)
    const { problemCase } = handleCase(problemNumber, problemTotalNumber)

    return (
        <div>
            <Menu problemTotal = { problemTotalNumber } handleNowProblemChange = { handleNowProblemChange }/>
            <Title problemTitle = { problemTitle }/>
            <Appendix problemAppendix = { problemAppendix }/>
            <Description problemDescription = { problemDescription }/>
            <Limitation problemLimitation = { problemLimitation }/>
            <Case problemCase = { problemCase } problemCaseTotalNumber = { problemCaseTotalNumber }/>
        </div>
    );
}
