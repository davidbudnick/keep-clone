import { ThemeProvider } from "@/components/theme-provider"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Archived, Trash } from "@/pages";
import { Navbar, Sidebar } from "@/components";
import { ROUTES } from "@/constants/routes";

const client = new ApolloClient({
  uri: 'http://localhost:3333/query',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
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
  )
}