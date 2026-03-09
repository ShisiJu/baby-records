import { App as AntdApp, ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router/dom";
import { queryClient } from "@/lib/queryClient";
import { router } from "@/router";
import { UserInfoContext, type UserInfo } from "@/hooks/useUserInfo";
import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
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
