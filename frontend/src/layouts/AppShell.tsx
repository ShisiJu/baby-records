import { Avatar, Button, Layout, Typography } from 'antd'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useUserInfo } from '@/hooks/useUserInfo'
import { setAuthToken } from '@/lib/api/client'

const { Header, Content } = Layout

export function AppShell() {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useUserInfo()

  const handleLogout = () => {
    setAuthToken(null)
    setUserInfo(null)
    navigate('/login')
  }

  return (
    <Layout className="min-h-screen">
      <Header className="border-b border-[#f3c8b7] bg-[#7a4e35] px-4 shadow-sm">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-6">
            <Typography.Title level={4} className="m-0!">
              <Link to="/" className="text-[#fff7ef] no-underline">
                Baby Growth
              </Link>
            </Typography.Title>

            <nav className="flex items-center gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm no-underline ${
                    isActive
                      ? 'bg-[#fff7ef] text-[#7a4e35]'
                      : 'text-[#ffe4d4] hover:bg-[#8f5f43] hover:text-white'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/records"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm no-underline ${
                    isActive
                      ? 'bg-[#fff7ef] text-[#7a4e35]'
                      : 'text-[#ffe4d4] hover:bg-[#8f5f43] hover:text-white'
                  }`
                }
              >
                Records
              </NavLink>
            </nav>
          </div>

          {userInfo ? (
            <div className="flex shrink-0 items-center gap-3">
              <Avatar
                style={{ backgroundColor: '#f2b766', color: '#7a4e35' }}
                size="small"
              >
                {userInfo.email.charAt(0).toUpperCase()}
              </Avatar>
              <span className="max-w-52 truncate text-sm text-[#fff7ef]">
                {userInfo.email}
              </span>
              <Button
                type="text"
                className="text-[#fff7ef]! hover:bg-[#8f5f43]! hover:text-white!"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </Header>

      <Content className="mx-auto w-full max-w-6xl p-6">
        <Outlet />
      </Content>
    </Layout>
  )
}
