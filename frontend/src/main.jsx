import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"

import {QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query"

const queryClient =  new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
<ClerkProvider>
  <BrowserRouter>
   <QueryClientProvider client={queryClient}>
        <App />

   </QueryClientProvider>
  </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
