import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./i18n/i18n.ts"
import {client} from "./utils/apollo.ts";
import {ApolloProvider} from "@apollo/client/react";
import {HeroUIProvider} from "@heroui/react";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ApolloProvider client={client}>
          <HeroUIProvider>
          <App />
          </HeroUIProvider>
      </ApolloProvider>
  </StrictMode>,
)
