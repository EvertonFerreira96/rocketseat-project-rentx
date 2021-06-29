import React, {useState, createContext, useContext, ReactNode} from 'react';

import { api } from '../services/api';

interface User { 
    id: string; 
    avatar: string; 
    email: string; 
    nome: string;
    driver_license: string;
}

interface AuthState { 
    token: string;
    user: User; 
}

interface AuthContextData { 
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>
}

interface SignInCredentials { 
    email: string; 
    password: string; 
}

interface AuthProviderProps{ 
    children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


function useAuth(): AuthContextData {
    return useContext(AuthContext) 
}


function AuthProvider({children}: AuthProviderProps) { 
    const [collection, setCollection] = useState<AuthState>({} as AuthState);

    async function signIn({email, password}: SignInCredentials){
        const {data: { user, token }} = await api.post('/sessions', {
            email, 
            password
        });

        api.defaults.headers.authorization = `Bearer ${token}`; 

        setCollection({ user, token})

    }

    return (
        <AuthContext.Provider 
            value={{
                user: collection.user, 
                signIn
            }}
            >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider, 
    useAuth
}