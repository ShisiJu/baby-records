import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, type RegisterInput } from "@/lib/api/account";
import { setAuthToken } from "@/lib/api/client";
import { queryClient } from "@/lib/queryClient";
import { useUserInfo } from "@/hooks/useUserInfo";

type RegisterFormValues = RegisterInput & {
  confirmPassword: string;
};

export function RegisterPage() {
  const [form] = Form.useForm<RegisterFormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfo();

  const { mutate, isPending } = useMutation(
    {
      mutationFn: registerUser,
      onSuccess: (data) => {
        setUserInfo({
          id: data.user.id,
          email: data.user.email,
        });
        setAuthToken(data.token);

        messageApi.success("Registration successful.");
        form.resetFields();
        navigate("/");
      },
      onError: (error) => {
        const fallbackMessage = "Unable to register. Please try again.";
        if (error instanceof AxiosError) {
          const apiMessage =
            (error.response?.data as { message?: string } | undefined)
              ?.message ?? error.message;
          messageApi.error(apiMessage || fallbackMessage);
          return;
        }
        messageApi.error(fallbackMessage);
      },
    },
    queryClient,
  );

  const onFinish = ({ email, password }: RegisterFormValues) => {
    mutate({ email, password });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {contextHolder}
      <Card title="Register" className="w-full max-w-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email." },
              {
                type: "email",
                message: "Please enter a valid email address.",
              },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password." },
              { min: 8, message: "Password must be at least 8 characters." },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match."),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending} block>
              Register
            </Button>
          </Form.Item>

          <Typography.Text type="secondary">
            Already have an account? <Link to="/login">Sign in</Link>
          </Typography.Text>
        </Form>
      </Card>
    </div>
  );
}
