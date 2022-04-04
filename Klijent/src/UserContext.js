import { createContext, useContext } from "react";

export const UserContext = createContext({});
export const useUser = useContext(UserContext)

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    role: "",
    status: ""
    });
  
  const setUserToState = (email, role, s) => {
    setUser({email, role, status:s})
  }
  return (
    <UserContext.Provider value={{user, setUserToState}} >
      {children}
    </UserContext.Provider>
  )
};

export default UserProvider;