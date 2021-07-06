import React, {useState, useEffect, createContext, useContext, ReactNode} from 'react';

import { api } from '../services/api';

import { database } from '../database'; 

import { User as UserModel } from '../database/models/User'; 

interface User { 
    id: string; 
    user_id: string; 
    token: string;
    avatar: string; 
    email: string; 
    name: string;
    driver_license: string;
}

interface AuthContextData { 
    user: User;
    loading: boolean;
    signIn: (credentials: SignInCredentials) => Promise<void>
    signOut: () => void;
    updateUser: (user: User) => Promise<void>; 

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
    return useContext(AuthContext);
}

function AuthProvider({children}: AuthProviderProps) { 
    const [collection, setCollection] = useState<User>({} as User);
    const [loading, setLoading] = useState(true); 
    async function signIn({email, password}: SignInCredentials){

        try {

            const {data: { user, token }} = await api.post('/sessions', {
                email, 
                password
            });
    
            api.defaults.headers.authorization = `Bearer ${token}`; 
            const userCollection = database.get<UserModel>("users");
            await database.action( async () => {
                await userCollection.create(( newUser ) => {
                    newUser.user_id = user.id,
                    newUser.name = user.name,
                    newUser.email = user.email,
                    newUser.avatar = user.avatar,
                    newUser.driver_license = user.driver_license
                    newUser.token = token
                })
            })
            setCollection({ ...user, token})
    
        }
        catch(e){
            throw new Error(e); 
        }

    }

    async function signOut() {
        try {
            
            const userCollection = database.get<UserModel>("users");
            await database.action( async () => { 
                const userSelected = await userCollection.find(collection.id); 
                await userSelected.destroyPermanently();
            });

            setCollection({} as User)
        } catch (e) {
            console.log(e);
        }
    }

    async function updateUser(user: User) {
        try {
            const userCollection = database.get<UserModel>("users");
            await database.action( async () => {
                const userFound = await userCollection.find(user.id); 
                await userFound.update(( userData ) => {
                    userData.avatar = user.avatar,
                    userData.name = user.name,
                    userData.driver_license = user.driver_license
                }); 
            });
            setCollection(user)
        } catch (e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        let isMounted = true; 

        (async () => { 
            try {
                const userCollection = database.get<UserModel>('users');
                const response = await userCollection.query().fetch(); 
                if(response.length > 0){
                    const userData = response[0]._raw as unknown as User; 
                    api.defaults.headers.authorization = `Bearer ${userData.token}`; 
                    if(isMounted){
                            setCollection(userData);
                        }
                    }
                    
                } catch (e) {
                    console.log(e)   
                }
                finally{
                setLoading(false)
                
            }
        })()
        return () => { isMounted = false }
    }, [])
    
    return (
        <AuthContext.Provider 
            value={{
                user: collection, 
                loading,
                signIn,
                signOut,
                updateUser,
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