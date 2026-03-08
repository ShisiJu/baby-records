import { Layout, Menu, Typography } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useMemo } from 'react'

const { Header, Content } = Layout

export function AppShell() {
  const location = useLocation()

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith('/records')) return 'records'
    return 'dashboard'
  }, [location.pathname])

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center bg-white px-4 shadow-sm">
        <div className="flex items-center gap-6">
          <Typography.Title level={4} className="!m-0">
            Baby Growth
          </Typography.Title>
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={[
              { key: 'dashboard', label: <Link to="/">Dashboard</Link> },
              { key: 'records', label: <Link to="/records">Records</Link> },
            ]}
          />
        </div>
      </Header>

      <Content className="mx-auto w-full max-w-6xl p-6">
        <Outlet />
      </Content>
    </Layout>
  )
}
