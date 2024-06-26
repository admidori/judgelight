import axios from "axios";
import React from "react";

export default function Login(){
    const [loginFlag, setLoginFlag] = React.useState("0")
    const [id, setId] = React.useState(null)
    const [password, setPassword] = React.useState(null)

    React.useEffect(() => {
        const storedLoginFlag = localStorage.getItem("loginFlag");
        const storedId = localStorage.getItem("id");
        const storedPassword = localStorage.getItem("password");
        if (storedLoginFlag && storedId && storedPassword) {
            setLoginFlag(storedLoginFlag);
            setId(storedId);
            setPassword(storedPassword)
        }
    }, []);

    const handleClickLogout = () => {
        localStorage.setItem("loginFlag", "0")
        localStorage.setItem("id", null)
        localStorage.setItem("password", null)
        setLoginFlag("0")
        setId(null)
        setPassword(null)

        localStorage.clear();
        console.log(localStorage)
        alert("Logout Successfull")
        window.location.reload();
    }

    const handleClick = () => {
        const sendJsonData = JSON.stringify(
            {
                "student_id": id,
                "password": password
            }
        );

        axios.post('http://localhost:8080/register/login',sendJsonData)
        .then(function(response){
            const responseJsonData = JSON.parse(JSON.stringify(response))
            console.log(responseJsonData.data)
            if (responseJsonData.data.status == "success"){
                alert("Login Successfull")
                setLoginFlag("1")
                localStorage.setItem("loginFlag", "1")
                localStorage.setItem("id", id)
                localStorage.setItem("password", password)
            }
            else{
                alert("Login Failed")
            }
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return (
    <div>
        {
        (function () {
            if (loginFlag == "1") {
                return (
                    <input value={id} readOnly></input>
                );
            }else{
                return(
                    <input value={id} placeholder="学籍番号" onChange={(event) => setId(event.target.value)}></input>
                );
            }
        }())
        }
        {
        (function () {
            if (loginFlag == "1") {
                return (
                    <input value={password} type="password" readOnly></input>
                );
            }else{
                return(
                    <input value={password} type="password" placeholder="パスワード" onChange={(event) => setPassword(event.target.value)}></input>
                );
            }
        }())
        }
        {(
            function(){
                if (loginFlag == "1") {
                    return (
                        <button disabled onClick={handleClick}>Login</button>
                    );
                }else{
                    return(
                        <button onClick={handleClick}>Login</button>
                    );
                }
            }
        )()}
                {(
            function(){
                if (loginFlag == "1") {
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
