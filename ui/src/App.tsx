import { ThemeProvider } from "@/components/theme-provider"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import List from "@/components/list/List";

const client = new ApolloClient({
  uri: 'http://localhost:3333/query',
  cache: new InMemoryCache(),
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <List />
      </ThemeProvider>
    </ApolloProvider>
  )
}