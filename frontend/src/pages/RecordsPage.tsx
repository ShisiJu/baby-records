import { Alert, Card, Typography } from 'antd'

export function RecordsPage() {
  return (
    <div className="space-y-6">
      <Typography.Title level={2} className="!mb-1">
        Records
      </Typography.Title>
      <Card title="Placeholder">
        <Alert
          type="info"
          showIcon
          title="Records page is intentionally minimal."
          description="Tell me your preferred record fields and workflow, then I will implement exactly that."
        />
      </Card>
    </div>
  )
}
