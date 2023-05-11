// pages/_app.tsx
import '../styles/tailwind.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Layout from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import apolloClient from '../lib/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp