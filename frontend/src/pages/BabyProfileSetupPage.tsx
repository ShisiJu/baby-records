import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button, Card, DatePicker, Form, Input, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { createBabyProfile } from "@/lib/api/account";

type BabyProfileFormValues = {
  name: string;
  birthDate: Dayjs;
};

export function BabyProfileSetupPage() {
  const [form] = Form.useForm<BabyProfileFormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createBabyProfile,
    onSuccess: () => {
      messageApi.success("Baby profile saved.");
      navigate("/");
    },
    onError: (error) => {
      const fallbackMessage = "Unable to save baby profile. Please try again.";
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

  const onFinish = ({ name, birthDate }: BabyProfileFormValues) => {
    mutate({
      name: name.trim(),
      birth_date: birthDate.format("YYYY-MM-DD"),
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      {contextHolder}
      <Card title="Tell us about your baby" className="w-full max-w-md">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Baby Name"
            name="name"
            rules={[
              { required: true, message: "Please enter baby name." },
              { max: 100, message: "Baby name must be 100 characters or less." },
            ]}
          >
            <Input placeholder="Baby name" />
          </Form.Item>

          <Form.Item
            label="Birth Date"
            name="birthDate"
            rules={[{ required: true, message: "Please select birth date." }]}
          >
            <DatePicker
              className="w-full"
              disabledDate={(current) => current && current > dayjs().endOf("day")}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending} block>
              Save and Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
