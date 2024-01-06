import { ThemeProvider } from "@/components/theme-provider"
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Home, Archived, Trash } from "@/pages";
import { Navbar, Sidebar } from "@/components";
import { ROUTES } from "@/constants/routes";
import { AUTH } from "./constants/auth";

const httpLink = new HttpLink({ uri: 'http://localhost:3333/query' });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH.GOOGLE_CREDENTIAL);

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_API_CLIENT_ID}>
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Navbar />
            <Sidebar />
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.ARCHIVED} element={<Archived />} />
              <Route path={ROUTES.TRASH} element={<Trash />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </GoogleOAuthProvider>
  )
}