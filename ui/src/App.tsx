import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Home, Archived, Trash } from "@/pages";
import { Navbar, Sidebar } from "@/components";
import { ROUTES } from "@/constants/routes";
import { AUTH } from "@/constants/auth";
import { AuthProvider } from "@/contexts/AuthContext";
import i18n from "i18next";
import { locales, resources } from "@/locales/i18n";
import { initReactI18next } from "react-i18next";
import { DARK } from "@/constants/theme";
import { UpdateTheme } from "@/lib/theme";

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
        lng: locales.en,
        fallbackLng: locales.en,
        interpolation: {
            escapeValue: false
        }
    });


export const App = () => {
    UpdateTheme(DARK);
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_API_CLIENT_ID}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <AuthProvider client={client}>
                        <Navbar />
                        <Sidebar />
                        <div className="pl-14 pt-16 md:pl-20 md:pt-20">
                            <Routes>
                                <Route path={ROUTES.HOME} element={<Home />} />
                                <Route path={ROUTES.ARCHIVED} element={<Archived />} />
                                <Route path={ROUTES.TRASH} element={<Trash />} />
                            </Routes>
                        </div>
                    </AuthProvider>
                </BrowserRouter>
            </ApolloProvider>
        </GoogleOAuthProvider>
    )
}

export default App;
