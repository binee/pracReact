import axios from 'axios';
import React, {createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    let userProfile = localStorage.getItem("userProfile");
    const [user, setUser] = useState([() => {
        if(userProfile){
        return JSON.parse(userProfile);
        }
    return null;
    }]);
    const navigate = useNavigate();
    const login = async(payload) => {
        console.log(login);
        let apiResponse = await axios.post(`http://localhost:5000/users/login`,payload,{
            withCredentials: true,
        });
        console.log(apiResponse);
    localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
    setUser(apiResponse.data);
    navigate("/");
};
  return (
<>
<AuthContext.Provider value={{user,login}}>{children}</AuthContext.Provider>

</>  )
}

export default AuthContext;