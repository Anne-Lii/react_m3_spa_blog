import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from '../types/auth.types';

//create context
const AuthContext = createContext < AuthContextType | null >(null);

interface AuthProviderProps {
    children: ReactNode
}

//register a provider
export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {

    //states
    const [user, setUser] = useState <User | null>(null);

    //login user
    const login = async(credentials: LoginCredentials) => {

        const API_URL = 'https://react-api-m3.onrender.com';

        //fetch
        try {
            const res = await fetch(`${API_URL}/login`, {
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

    //logout user
    const logout = () => {

        //remove token from localstorage
        localStorage.removeItem('token');

        //uppdate userinfo to null
        setUser(null);
    }

    //validate token
    const checkToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        try {
            const res = await fetch(`https://react-api-m3.onrender.com/validate`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + token

                }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value= {{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error ('useAuth måste användas inom en AuthProvider');
    }

    return context;
}