import { ThemeProvider } from "@/components/theme-provider"
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Home, Archived, Trash } from "@/pages";
import { Navbar, Sidebar } from "@/components";
import { ROUTES } from "@/constants/routes";
import { AUTH } from "@/constants/auth";
import { AuthProvider } from "@/contexts/AuthContext";
import i18n from "i18next";
import { localStorageKey, locales, resources } from "@/locales/i18n";
import { initReactI18next } from "react-i18next";

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(AUTH.GOOGLE_CREDENTIAL);
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        }
    });

    return forward(operation);
});

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_GRAPHQL_ENDPOINT });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

i18n.use(initReactI18next)
    .init({
        resources: resources,
        lng: localStorage.getItem(localStorageKey) || locales.en,
        fallbackLng: locales.en,
        interpolation: {
            escapeValue: false
        }
    });

export const App = () => {
    console.log("CLIENT_ID", import.meta.env.VITE_API_CLIENT_ID);
    console.log("API_ENDPOINT", import.meta.env.VITE_API_GRAPHQL_ENDPOINT)
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_API_CLIENT_ID}>
            <ApolloProvider client={client}>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <BrowserRouter>
                        <AuthProvider>
                            <Navbar />
                            <Sidebar />

                            <Routes>
                                <Route path={ROUTES.HOME} element={<Home />} />
                                <Route path={ROUTES.ARCHIVED} element={<Archived />} />
                                <Route path={ROUTES.TRASH} element={<Trash />} />
                            </Routes>
                        </AuthProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </ApolloProvider>
        </GoogleOAuthProvider>
    )
}

export default App;
