import { App as AntdApp, ConfigProvider } from 'antd'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from './lib/queryClient'
import { router } from './router'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7c3aed',
          borderRadius: 10,
        },
      }}
    >
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
