import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from '@/router';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false, // 重连时不重新请求
      refetchOnWindowFocus: false, // 窗口焦点变化时不重新请求
      retry: 3, // 重试次数
      staleTime: 5 * 60 * 1000, // 5分钟内数据不会重新请求
      gcTime: 5 * 60 * 1000, // 数据过期时间，超过5分钟后会被清理
    },
  },
});

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
