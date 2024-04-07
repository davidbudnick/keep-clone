import { AUTH } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";
import { CredentialResponse, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, useUpdateUserMutation, UpdateUserMutation, useAuthLoginLazyQuery } from "@/graphql/generated/schema";
import { format } from "date-fns";
import { ApolloClient, FetchResult, NormalizedCacheObject } from "@apollo/client";
import { locales } from "@/locales/i18n";
import i18n from "i18next";
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
    user?: User;
}

const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    update: async () => { return {} as FetchResult<UpdateUserMutation> },
    user: undefined
})

type AuthProviderProps = {
    client: ApolloClient<NormalizedCacheObject>
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, client }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const [UpdateUserMutation] = useUpdateUserMutation();
    const [getCode] = useAuthLoginLazyQuery();

    const login = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            const data = await getCode({
                variables: {
                    code: codeResponse.code
                }
            })

            localStorage.setItem(AUTH.GOOGLE_ACCESS_TOKEN, data.data?.authLogin.tokens.accessToken || "");
            localStorage.setItem(AUTH.GOOGLE_REFRESH_TOKEN, data.data?.authLogin.tokens.refreshToken || "");
            localStorage.setItem(AUTH.GOOGLE_TOKEN_EXPIRY, data.data?.authLogin.tokens.exp || "");

            setUser(data.data?.authLogin.user);
            setIsAuthenticated(true);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    const logout = () => {
        client.resetStore()
        i18n.changeLanguage(locales.en)
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH.GOOGLE_ACCESS_TOKEN);
        localStorage.removeItem(AUTH.GOOGLE_REFRESH_TOKEN);
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


    //TODO: add refresh logic
    // useEffect(() => {
    // 2024-03-24T22:33:24-05:00
    //time is formatted like this
    // const exp = localStorage.getItem(AUTH.GOOGLE_TOKEN_EXPIRY);
    // if (exp) {
    //     if (new Date().getTime() > Number(exp) * 1000) {
    //         //TODO: refresh token
    //         logout();
    //     }
    // }
    // }, [isAuthenticated])


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, update, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
