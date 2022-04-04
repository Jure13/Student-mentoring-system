import React, { useContext } from "react";
import { navigate, Redirect } from "@reach/router";
import { UserContext } from "./UserContext";


const Logout = () => {
    const { user, setUser } = useContext(UserContext);
    localStorage.removeItem("token");
    setUser("");
    navigate('/')
    return <div></div>
};

export default Logout;