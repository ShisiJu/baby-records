import { App as AntdApp, ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router/dom";
import { queryClient } from "@/lib/queryClient";
import { router } from "@/router";
import { UserInfoContext } from "@/hooks/useUserInfo";
import { usePersistentUserInfo } from "@/hooks/usePersistentUserInfo";

function App() {
  const { userInfo, setUserInfo } = usePersistentUserInfo();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7c3aed",
          borderRadius: 10,
        },
      }}
    >
      <AntdApp>
        <UserInfoContext value={{ userInfo, setUserInfo }}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </UserInfoContext>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
