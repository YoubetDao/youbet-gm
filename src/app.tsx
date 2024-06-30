import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './router'
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
          <RouterProvider router={createRouter()} />
          <ReactQueryDevtools />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
