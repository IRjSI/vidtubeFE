import { createContext, ReactElement, useEffect, useState } from "react";

export type AuthContextType = {
    isLoggedIn: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function ContextProvider({ children }: { children: ReactElement }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsLoggedIn(true);
            //@ts-ignore
            setToken(storedToken);
        }
    }, [])

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setIsLoggedIn(true);
        //@ts-ignore
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setToken(null)
    }

    const contextValue = {
        token,
        isLoggedIn,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
