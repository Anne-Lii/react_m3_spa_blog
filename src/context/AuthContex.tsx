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
    const [loading, setLoading] = useState(true);

    //login user
    const login = async(credentials: LoginCredentials) => {


        //fetch
        try {
            const res = await fetch(`https://react-api-m3.onrender.com/login`, {
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
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`https://react-api-m3.onrender.com/validate`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                localStorage.removeItem('token');
                setUser(null);
            }
        } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkToken();
    }, [])

    return (
        <AuthContext.Provider value= {{user, login, logout, loading}}>
            {!loading && children}
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