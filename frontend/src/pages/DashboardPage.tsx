import { useQuery } from '@tanstack/react-query'
import { Card, Tag, Typography } from 'antd'
import { fetchHealth } from '../lib/api/health'

export function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  })

  return (
    <div className="space-y-6">
      <Typography.Title level={2} className="!mb-1">
        Dashboard
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Minimal starter page. Backend connectivity is checked below.
      </Typography.Paragraph>

      <Card title="Backend status">
        {isLoading && <Tag color="processing">Checking...</Tag>}
        {isError && <Tag color="error">Unreachable</Tag>}
        {!isLoading && !isError && <Tag color="success">{data?.status ?? 'ok'}</Tag>}
      </Card>
    </div>
  )
}
