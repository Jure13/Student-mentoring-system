import React, { useContext, useState } from "react";
import { navigate } from "@reach/router";
import { UserContext } from "./UserContext";


export const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(UserContext);

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }
    
    function handleLogin(e) {
        e.preventDefault();
    
        fetch("http://localhost:5000/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            if (data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                setUser(email);
                navigate('/');
            } else {
                console.log("Authentication error");
            }
        })
        .catch((err)=>console.log(err));
    }

    return(
    <div>
        <form onSubmit={(e) => {handleLogin(e);}}>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                value={email}
                onChange={onChangeEmail}
                onBlur={onChangeEmail}
            ></input>

            <label htmlFor="password">Lozinka</label>
            <input
                type="password"
                value={password}
                onChange={onChangePassword}
                onBlur={onChangePassword}
            ></input>

            <button type="submit">Login</button>
        </form>
    </div>
    )
};

export default Login;