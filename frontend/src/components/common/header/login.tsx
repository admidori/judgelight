import React, { useEffect } from "react";
import { LoginContext, AuthInfoContext } from "../../../provider/auth";

export default function Login(){
    const loginStatus = React.useContext(LoginContext)
    const [ authInfo, setAuthInfo ] = React.useContext(AuthInfoContext)

    const [id, setId] = React.useState<string>(authInfo.userId)
    const [password, setPassword] = React.useState<string>(authInfo.userPassword)
    
    useEffect(() => {
        const localStorageAuthInfo = localStorage.getItem("authInfo")
        if (localStorageAuthInfo) {
            setAuthInfo(JSON.parse(localStorageAuthInfo))
            setId(JSON.parse(localStorageAuthInfo).userId)
            setPassword(JSON.parse(localStorageAuthInfo).userPassword)
        }else {
            setAuthInfo({ userId: "", userPassword: "" })
        }
    }, [])

    const handleClickLogout = () => {
        setAuthInfo({ userId: "", userPassword: "" })
        alert("Logout Successful")
        localStorage.removeItem("authInfo")
        window.location.reload()
    }

    const handleClickLogin = () => {
        setAuthInfo({ userId: id, userPassword: password })
        alert("Login Successful")
    }

    return (
    <div>
        {(function () {
            if (loginStatus) {
                return (
                    <input value={id} readOnly></input>
                );
            }else{
                return(
                    <input value={id} placeholder="学籍番号" onChange={(event) => setId(event.target.value)}></input>
                );
            }
        }())}
        {(function () {
            if (loginStatus) {
                return (
                    <input value={password} type="password" readOnly></input>
                );
            }else{
                return(
                    <input value={password} type="password" placeholder="パスワード" onChange={(event) => setPassword(event.target.value)}></input>
                );
            }
        }())}
        {(function(){
                if (loginStatus) {
                    return (
                        <button disabled onClick={handleClickLogin}>Login</button>
                    );
                }else{
                    return(
                        <button onClick={handleClickLogin}>Login</button>
                    );
                }
            }
        )()}
        {(function(){
                if (loginStatus) {
                    return (
                        <button onClick={handleClickLogout}>Logout</button>
                    );
                }else{
                    return(
                        <button disabled onClick={handleClickLogout}>Logout</button>
                    );
                }
            }
        )()}
    </div>
    );
}
