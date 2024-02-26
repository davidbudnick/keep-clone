import { AUTH } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, useUpdateUserMutation, useGetUserQuery, UpdateUserMutation } from "@/graphql/generated/schema";
import { format } from "date-fns";
import { ApolloClient, FetchResult, NormalizedCacheObject } from "@apollo/client";
import { locales } from "@/locales/i18n";
import i18n from "i18next";
import { UpdateTheme } from "@/lib/theme";
import { DARK } from "@/constants/theme";


interface UpdateUser {
    email?: string,
    familyName?: string,
    givenName?: string,
    lastLogin?: string,
    name?: string,
    picture?: string,
    hd?: string,
    settings?: {
        theme?: string,
        locale?: string
    },
    userId?: string
}

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (response: CredentialResponse) => void;
    logout: () => void;
    update: (updateUser: UpdateUser
    ) => Promise<FetchResult<UpdateUserMutation>>;
    loading: boolean;
    user?: User;
}

const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    update: async () => { return {} as FetchResult<UpdateUserMutation> },
    loading: false,
    user: undefined
})

export interface GoogleUser {
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

type AuthProviderProps = {
    client: ApolloClient<NormalizedCacheObject>
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, client }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [googleUser, setGoogleUser] = useState<GoogleUser>()
    const navigate = useNavigate();

    const [UpdateUserMutation] = useUpdateUserMutation();

    const { loading: userLoading, data: userData } = useGetUserQuery({
        variables: { id: googleUser?.sub || "" },
        skip: !isAuthenticated,
    });

    const login = async (response: CredentialResponse) => {
        localStorage.setItem(AUTH.GOOGLE_CLIENT, response.clientId || "");
        localStorage.setItem(AUTH.GOOGLE_CREDENTIAL, response.credential || "");
        setIsAuthenticated(true);
        const googleUser = decodeUser(response.credential || "")
        setGoogleUser(googleUser);
    };

    const logout = () => {
        client.resetStore()
        i18n.changeLanguage(locales.en)
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH.GOOGLE_CLIENT);
        localStorage.removeItem(AUTH.GOOGLE_CREDENTIAL);
        googleLogout();
        setUser(undefined);
        navigate(ROUTES.HOME);
    };

    const update = async (updateUser: UpdateUser
    ) => {
        const updatedUser = await UpdateUserMutation({
            variables: {
                input: {
                    email: updateUser.email || user?.email || "",
                    familyName: updateUser.familyName || user?.familyName || "",
                    givenName: updateUser.givenName || user?.givenName || "",
                    lastLogin: formatLastLogin(updateUser.lastLogin || user?.lastLogin || new Date().toISOString()),
                    name: updateUser.name || user?.name || "",
                    picture: updateUser.picture || user?.picture || "",
                    hd: updateUser.hd || user?.hd || "",
                    settings: {
                        theme: updateUser.settings?.theme || user?.settings.theme || DARK,
                        locale: updateUser.settings?.locale || user?.settings.locale || locales.en
                    },
                    userId: updateUser.userId || user?.userId || ""
                }
            }
        });
        return updatedUser;
    }

    const formatLastLogin = (date: Date | string): string => {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        return format(dateObj, "yyyy-MM-dd HH:mm:ss");
    }

    const decodeUser = (credential: string): GoogleUser => {
        return JSON.parse(atob(credential?.split(".")[1] || ""));
    }

    const setupUser = async (googleUser: GoogleUser) => {
        if (!userLoading && userData?.user === null) {
            const nu = await update({
                email: googleUser.email,
                familyName: googleUser.family_name,
                givenName: googleUser.given_name,
                lastLogin: new Date().toISOString(),
                name: googleUser.name,
                picture: googleUser.picture,
                hd: googleUser.hd,
                userId: googleUser.sub
            });
            setUser(nu.data?.updateUser);
        } else if (!userLoading && userData?.user) {
            setUser(userData.user);
            i18n.changeLanguage(
                userData.user.settings?.locale
            );
            UpdateTheme(userData.user.settings?.theme)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem(AUTH.GOOGLE_CREDENTIAL);
        if (token) {
            setIsAuthenticated(true);

            const googleUser = decodeUser(token)
            setGoogleUser(googleUser);

            setupUser(googleUser);

            if (googleUser?.exp) {
                if (Date.now() > googleUser.exp * 1000) {
                    logout();
                }
            }
        }
    }, [user, userLoading])


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, update, user, loading: userLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
