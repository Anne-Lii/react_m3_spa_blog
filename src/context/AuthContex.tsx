import { createContext, useState, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from '../types/auth.types';

//create context
const AuthContext = createContext < AuthContextType | null >(null);

interface AuthProviderProps {
    children: ReactNode
}

//provider
export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {

    //states
    const [user, setUser] = useState <User | null>(null);

    //method to login
    const login = async(credentials: LoginCredentials) => {

        //fetch
        try {
            const res = await fetch('http://react-api-m3.onrender.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })

            if (!res.ok) {
                throw new Error('Inloggningen misslyckades');
            }

            const data = await res.json() as AuthResponse;

            //save token to localstorage
            localStorage.setItem('token', data.token);

            //store userinfo
            setUser(data.user);

        } catch (error) {
            throw error;
        }
        
    }

    const logout = () => {

        //remove token from localstorage
        localStorage.removeItem('token');

        //uppdate userinfo to null
        setUser(null);
    }
}