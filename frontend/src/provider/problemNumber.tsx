import React from "react";

export const ProblemNumberContext = React.createContext<[Number, React.Dispatch<React.SetStateAction<Number>>]>([1 , () => {}])

export default function ProblemNumberProvider(props){
    const [problemNumber, SetProblemNumber] = React.useState(1)

    return(
        <ProblemNumberContext.Provider value={[problemNumber, SetProblemNumber]}>
            {props.children}
        </ProblemNumberContext.Provider>
        
    )
}
