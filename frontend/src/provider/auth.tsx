import React, { useEffect } from "react"
import axios from "axios";
import { baseURL } from "../pages"

type AuthInfo = {
    userId: string;
    userPassword: string;
}

export const LogginContext = React.createContext<boolean>(false)
export const AuthInfoContext = React.createContext<[AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>]>([{ userId: "", userPassword: "" }, () => {}]);

function getLocalStorageAuthInfo(): AuthInfo {
    const localStorageAuthInfo = localStorage.getItem("authInfo");
    if (localStorageAuthInfo) {
        return JSON.parse(localStorageAuthInfo);
    }else {
    return { userId: "", userPassword: "" }
    }
}

function setLocalStorageAuthInfo(authInfo: AuthInfo) {
    window.localStorage.setItem("authInfo", JSON.stringify(authInfo));
}

export default function AuthContextProvider(props){
    const [ authInfo, setAuthInfo ] = React.useState<AuthInfo>({ userId: "", userPassword: "" });
    const [ loginStatus, setLoginStatus ] = React.useState<boolean>(false);

    useEffect(() => {
        if (authInfo?.userId && authInfo?.userPassword) {
            const sendJsonData = JSON.stringify(
                {
                    "student_id": authInfo.userId,
                    "password": authInfo.userPassword
                }
            );
    
            axios.post(baseURL+'/register/login',sendJsonData)
            .then(function(response){
                const responseJsonData = JSON.parse(JSON.stringify(response))
                console.log(responseJsonData.data)
                if (responseJsonData.data.status == "success"){
                    alert("Login Successfull")
                }
                else{
                    alert("Login Failed")
                }
            })
            .catch(function(error){
                console.log(error)
            })
            setLoginStatus(true)
        }else{
            setLoginStatus(false)
        }
    }, [authInfo]);

    return(
        <LogginContext.Provider value={loginStatus}>
            <AuthInfoContext.Provider value={[authInfo, setAuthInfo]}>
                {props.children}
            </AuthInfoContext.Provider>
        </LogginContext.Provider>
        
    )
}
