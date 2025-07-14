import React, { useEffect } from "react"
import axios from "axios";
import { baseURL } from "../pages"

type AuthInfo = {
    userId: string;
    userPassword: string;
}

export const LoginContext = React.createContext<boolean>(false)
export const AuthInfoContext = React.createContext<[AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>]>([{ userId: "", userPassword: "" }, () => {}])

export default function AuthContextProvider(props){
    const [ authInfo, setAuthInfo ] = React.useState<AuthInfo>({userId: "", userPassword: ""});
    const [ loginStatus, setLoginStatus ] = React.useState<boolean>(false)

    useEffect(() => {
        if (authInfo?.userId && authInfo?.userPassword && loginStatus == false) {
            const sendJsonData = JSON.stringify({
                "student_id": authInfo.userId,
                "password": authInfo.userPassword
            })
    
            axios.post(baseURL+'/register/login',sendJsonData)
            .then(function(response){
                const responseJsonData = JSON.parse(JSON.stringify(response))
                if (responseJsonData.data.status == "success"){
                    setAuthInfo(authInfo)
                    localStorage.setItem("authInfo", JSON.stringify(authInfo))
                    setLoginStatus(true)
                }
                else{
                    alert("Login Failed")
                    setLoginStatus(false)
                }
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }, [authInfo])

    return(
        <LoginContext.Provider value={loginStatus}>
            <AuthInfoContext.Provider value={[authInfo, setAuthInfo]}>
                {props.children}
            </AuthInfoContext.Provider>
        </LoginContext.Provider>
        
    )
}
