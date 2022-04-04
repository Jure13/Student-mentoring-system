import React, { useEffect, useState } from "react";
import {navigate} from "@reach/router";


export const Register = () =>{
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    function onChangeName(e) {
        setName(e.target.value);
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangePassword2(e) {
        setPassword2(e.target.value);
    }
    
    function handleLogin(e) {
        e.preventDefault();
    
        if (password !== password2) {
           alert("Lozinke se ne podudaraju!");
            return;
        }

        fetch("http://localhost:5000/api/register", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("Uspjesna registracija!");
            navigate('/login'); 
        })
        .catch((err)=>console.log(err));
    }

    return(
    <div>
        <form onSubmit={(e) => {handleLogin(e);}}>
        <label htmlFor="name">Ime</label>
            <input
                type="text"
                value={name}
                onChange={onChangeName}
                onBlur={onChangeName}
            ></input>
            
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

            <label htmlFor="repeat password">Ponovi lozinku</label>
            <input
                type="password"
                value={password2}
                onChange={onChangePassword2}
                onBlur={onChangePassword2}
            ></input>

            <button type="submit">Registriraj se</button>
        </form>
    </div>
    )
};

export default Register;