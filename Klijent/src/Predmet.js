import React, {useState, useEffect, useContext} from "react";
import { Link, navigate } from "@reach/router";
import { UserContext } from "./UserContext";

const Predmet = () => {
    const [predmet, setPredmet] = useState([]);
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:5000/api/predmet")
        .then((response) => response.json())
        .then((predmet) => { 
            console.log("AAAAA ", predmet)
            predmet = predmet.sort((a, b) =>(a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            setPredmet(predmet) });
    },[]);

    return(
        <div className="search-params">
            <div>
                    <button onClick={() => navigate('/logout')}>Logout</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Predmet</th>
                        <th>Program</th>
                    </tr>
                </thead>
                <tbody>
                    {predmet && predmet.map(p => 
                        <tr key={p.name}>
                            <Link to={"/predmet/" + p.name}>
                                <td className="name">{p.name}</td>
                            </Link>
                            <td>{p.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Predmet;


