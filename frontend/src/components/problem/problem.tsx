import React from "react";
import Menu from "./menu";
import Description from "./description";
import Case from "./case";
import Title from "./title";
import Appendix from "./appendix";
import Limitation from "./limitation";
import { handleGetProblemTotalNumber, handleGetProblemCaseTotalNumber, handleTitle, handleDescription, handleAppendix, handleLimitation, handleCase } from "./hooks";

export default function Problem(){
    const [nowProblemNumber, SetNowProblem] = React.useState(1)
    const handleNowProblemChange = (number) => {
        SetNowProblem(number)
    }
    
    const problemTotalNumber = handleGetProblemTotalNumber()
    const problemCaseTotalNumber = handleGetProblemCaseTotalNumber(nowProblemNumber)
    const { problemTitle } = handleTitle(nowProblemNumber)
    const problemDescription = handleDescription(nowProblemNumber)
    const { problemAppendix } = handleAppendix(nowProblemNumber)
    const { problemLimitation} = handleLimitation(nowProblemNumber)
    const { problemCase } = handleCase(nowProblemNumber, problemTotalNumber)

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
