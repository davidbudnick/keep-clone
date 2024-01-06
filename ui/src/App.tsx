import { ThemeProvider } from "@/components/theme-provider"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Home } from "@/pages";

const client = new ApolloClient({
  uri: 'http://localhost:3333/query',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Home />
      </ThemeProvider>
    </ApolloProvider>
  )
}