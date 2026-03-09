import { Button, Card, Col, Divider, Progress, Row, Space, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

const warmPalette = {
  peach: "#FFF2E8",
  cream: "#FFF9ED",
  coral: "#F08A5D",
  amber: "#F2B766",
  rose: "#F7C8B1",
  cocoa: "#7A4E35",
};

export function HomePage() {
  return (
    <div className="space-y-6">
      <Card
        variant="borderless"
        className="overflow-hidden rounded-2xl shadow-sm"
        styles={{
          body: {
            background: `linear-gradient(135deg, ${warmPalette.peach} 0%, ${warmPalette.cream} 100%)`,
          },
        }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={16}>
            <Space orientation="vertical" size={12}>
              <Tag color="orange" className="w-fit rounded-full px-3 py-1">
                Warm & gentle daily care
              </Tag>
              <Typography.Title level={2} className="m-0! text-[32px]!">
                Welcome to Baby Growth Diary
              </Typography.Title>
              <Typography.Paragraph className="mb-2! text-[16px]!">
                Track feeding, naps, and milestones in one place. Keep every
                precious update organized with a cozy dashboard designed for
                new parents.
              </Typography.Paragraph>
              <Space wrap>
                <Button type="primary" size="large">
                  <Link to="/records">Add New Record</Link>
                </Button>
                <Button size="large">View Today Summary</Button>
              </Space>
            </Space>
          </Col>
          <Col xs={24} md={8}>
            <Card
              variant="borderless"
              className="rounded-xl"
              style={{ background: "#fff" }}
            >
              <Typography.Text type="secondary">Today at a glance</Typography.Text>
              <Divider className="my-3!" />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Typography.Text>Feeding goal</Typography.Text>
                  <Typography.Text strong>4 / 6</Typography.Text>
                </div>
                <Progress percent={67} strokeColor={warmPalette.coral} showInfo={false} />
                <div className="flex items-center justify-between">
                  <Typography.Text>Sleep target</Typography.Text>
                  <Typography.Text strong>9.2h / 12h</Typography.Text>
                </div>
                <Progress percent={77} strokeColor={warmPalette.amber} showInfo={false} />
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card variant="borderless" className="rounded-xl shadow-sm">
            <Typography.Text type="secondary">Last feeding</Typography.Text>
            <Typography.Title level={3} className="mt-2! mb-1!">
              2h 15m ago
            </Typography.Title>
            <Typography.Text>Formula - 120 ml</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card variant="borderless" className="rounded-xl shadow-sm">
            <Typography.Text type="secondary">Last nap</Typography.Text>
            <Typography.Title level={3} className="mt-2! mb-1!">
              1h 40m
            </Typography.Title>
            <Typography.Text>Ended at 2:20 PM</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card variant="borderless" className="rounded-xl shadow-sm">
            <Typography.Text type="secondary">Mood check</Typography.Text>
            <Typography.Title level={3} className="mt-2! mb-1!">
              Happy
            </Typography.Title>
            <Typography.Text>Smiles, playful, active</Typography.Text>
          </Card>
        </Col>
      </Row>

      <Card variant="borderless" className="rounded-xl shadow-sm">
        <Typography.Title level={4}>Today Checklist</Typography.Title>
        <div className="grid gap-3 md:grid-cols-2">
          <Tag color="gold" className="m-0! rounded-lg px-3 py-2">
            Done - Morning feeding
          </Tag>
          <Tag color="gold" className="m-0! rounded-lg px-3 py-2">
            Done - Tummy time (20 min)
          </Tag>
          <Tag color="orange" className="m-0! rounded-lg px-3 py-2">
            Pending - Evening bath
          </Tag>
          <Tag color="orange" className="m-0! rounded-lg px-3 py-2">
            Pending - Bedtime story
          </Tag>
        </div>
      </Card>
    </div>
  );
}