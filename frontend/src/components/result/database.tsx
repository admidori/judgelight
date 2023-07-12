import React from "react";
import axios from "axios";

export default function Database(){
    React.useEffect(() => {
        axios.get("http://localhost:8080/database/", {
            params: {
                parmater: ""
            }
    })
    .then(function(response){
        const responseJsonData = JSON.parse(JSON.stringify(response))
    })
    .catch(function(error){
        console.log(error)
    })
},[]);

    return(
        <div>
            
        </div>
    );
}