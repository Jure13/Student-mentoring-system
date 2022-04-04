import React, {useState} from "react";
import {render} from "react-dom";
//import SearchParams from "./SearchParams";
import {Router} from "@reach/router";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { UserContext } from "./UserContext";
import Predmet from "./Predmet";




const App = () => {


    return(
        <div>
            <UserContext.Provider value={{user, setUser}}>
                <Router>
                    <Login path="/login" />
                    <Predmet path="/predmet"/>
                    {/* <Student path="/student"/>
                    <Upisani path="/upisani/:email"/>
                    <Uredi path="/uredi/:id"/> */}
                    <Register path="/register" />
                    <Logout path="/logout" />
                </Router>
            </UserContext.Provider>            
        
        </div>
    );
}



render(<App/>, document.getElementById("root"));
