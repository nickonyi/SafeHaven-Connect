import { useEffect } from 'react';
import { createContext,useState } from 'react';
import axios from 'axios';
import { makeRequest } from '../axios';


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const apiUrl = import.meta.env.VITE_apiUrl;
    const [message, setMessage] = useState({ content: '', status: '' });

    
    const login = async (inputs) => {
        
        const res =  await axios.post('http://localhost:8800/api/auth/login',inputs,{
        withCredentials:true,
       });

       setCurrentUser(res.data.other);
    }
    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(currentUser));
    }, [currentUser]);

    const registerForevent = async (formData)=> {
         try {
            const response = await axios.post(`${apiUrl}/users/registerforevent`, formData);
            return response.data;
         } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
         }
    }

    const getMyregisteredEvents = async () => {
        try {
            const response = await makeRequest.get(`${apiUrl}/users/myregister-event`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            setMessage({ content: errorMessage, status: 'fail' });
        }
    }
    return (
        <AuthContext.Provider value={{currentUser,login,registerForevent,getMyregisteredEvents}}>
           {children}
        </AuthContext.Provider>
    )
}