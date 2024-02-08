import { AUTH } from "@/constants/auth";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (response: CredentialResponse) => void;
    logout: () => void;
    user?: User;
}

const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    user: undefined
})

export interface User {
    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    hd?: string;
    email?: string;
    email_verified?: boolean;
    nbf?: number;
    name?: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    locale?: string;
    iat?: number;
    exp?: number;
    jti?: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User>();

    const login = (response: CredentialResponse) => {
        localStorage.setItem(AUTH.GOOGLE_CLIENT, response.clientId || "");
        localStorage.setItem(AUTH.GOOGLE_CREDENTIAL, response.credential || "");
        setIsAuthenticated(true);
        setUser(decodeUser(response.credential || ""));
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH.GOOGLE_CLIENT);
        localStorage.removeItem(AUTH.GOOGLE_CREDENTIAL);
        googleLogout();
        setUser(undefined);
    };

    const decodeUser = (credential: string) => {
        const decoded: User = JSON.parse(atob(credential?.split(".")[1] || ""));
        return decoded;
    }

    useEffect(() => {
        const token = localStorage.getItem(AUTH.GOOGLE_CREDENTIAL);
        if (token) {
            setIsAuthenticated(true);
            setUser(decodeUser(token));

            if (user?.exp) {
                if (Date.now() > user.exp * 1000) {
                    logout();
                }
            }
        }
    }, [user])


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
