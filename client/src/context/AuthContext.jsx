import { useEffect } from 'react';
import { createContext,useState } from 'react';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token,setToken] = useState(localStorage.getItem('token') || null);
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    
    const login = async (inputs) => {
        
        const res =  await axios.post('http://localhost:8800/api/auth/login',inputs,{
        withCredentials:true,
       });

       setCurrentUser(res.data.other);
       setToken(res.data.token)
    }
    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(currentUser));
        localStorage.setItem('token',JSON.stringify(token));
    }, [currentUser,token]);

    return (
        <AuthContext.Provider value={{currentUser,login,token}}>
           {children}
        </AuthContext.Provider>
    )
}