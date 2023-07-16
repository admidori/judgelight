import React from "react";

var flag = false
var loginStateId = ""

export default function Login(){
    const [id, setId] = React.useState(null)
    const [registerId, setRegisterId] = React.useState(null)

    React.useEffect(() => {
        localStorage.setItem('value', JSON.stringify(registerId));
      }, [registerId]);

    const handleClick = () => {
        setRegisterId(id)
        loginStateId = id
        flag = true
    }

    return (
    <div>
        <label>学籍番号</label>
        {
        (function () {
            if (flag == true) {
                return (
                    <input value={id} readOnly></input>
                );
            }else{
                return(
                    <input value={id} onChange={(event) => setId(event.target.value)}></input>
                );
            }
        }())
        }
    <button onClick={handleClick}>Register</button>
    </div>
    );
}
