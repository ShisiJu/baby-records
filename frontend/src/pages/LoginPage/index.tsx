import { Card, Form, Input, Button } from "antd";
import Link from "antd/es/typography/Link";

export function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card title="Login">
        <Form>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>

            <Link href="/register" className="ml-2">
              Register
            </Link>
          </Form.Item>
          <Form.Item>
            <Button type="link">Forgot password?</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
