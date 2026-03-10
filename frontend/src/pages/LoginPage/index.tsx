import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useUserInfo } from "@/hooks/useUserInfo";
import { loginUser } from "@/lib/api/account";
import { setAuthToken } from "@/lib/api/client";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const [form] = Form.useForm<LoginFormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const { setUserInfo } = useUserInfo();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuthToken(data.token);
      setUserInfo({
        id: data.user.id,
        email: data.user.email,
      });

      messageApi.success("Welcome back!");
      navigate(data.user.has_baby_profile ? "/" : "/baby-profile/new");
    },
    onError: (error) => {
      const fallbackMessage = "Login failed. Please try again.";
      if (error instanceof AxiosError) {
        const apiMessage =
          (error.response?.data as { error?: string; message?: string } | undefined)?.error ??
          (error.response?.data as { message?: string } | undefined)?.message ??
          error.message;
        messageApi.error(apiMessage || fallbackMessage);
        return;
      }
      messageApi.error(fallbackMessage);
    },
  });

  const onFinish = ({ email, password }: LoginFormValues) => {
    mutate({ email, password });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {contextHolder}
      <Card title="Login" className="w-full max-w-md">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email." },
              { type: "email", message: "Please enter a valid email address." },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password." }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending} block>
              Login
            </Button>
          </Form.Item>

          <Typography.Text type="secondary">
            New here? <Link to="/register">Create account</Link>
          </Typography.Text>
        </Form>
      </Card>
    </div>
  );
}
