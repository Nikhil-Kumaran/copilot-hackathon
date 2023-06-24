// Component to create the transactions
"use-client";
import { useGetTransactions } from "@/hooks/data-fetching/useGetTransactions";
import { usePostTransactions } from "@/hooks/data-fetching/usePostTransaction";
import { useUpdateTransactions } from "@/hooks/data-fetching/useUpdateTransaction";
import { useUser } from "@/hooks/data-fetching/useUser";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";

export function TransactionModal({ handleOk, defaultValues, isEdit = false }: { handleOk: () => void; defaultValues?: any; isEdit?: boolean }) {
  const { trigger: createTrans, data, isMutating, error } = usePostTransactions();
  console.log("setCurrentTrans(undefined)", defaultValues);
  const { trigger: updateTrans } = useUpdateTransactions(defaultValues?.id);
  const [form] = Form.useForm();
  const { data: user } = useUser();

  const { mutate } = useGetTransactions(user?.username);
  return (
    <Form
      layout={"vertical"}
      name="basic"
      style={{ maxWidth: 600, marginTop: "2rem" }}
      initialValues={defaultValues ? { ...defaultValues, date: dayjs(defaultValues?.date ? new Date(defaultValues?.date) : new Date()) } : undefined}
      onFinish={(values) => {
        if (isEdit) {
          updateTrans({ data: { ...values, type: "expense", user: user.id } }).then(() => {
            mutate();
            handleOk();
          });
        } else {
          createTrans({ data: { ...values, type: "expense", user: user.id } }).then(() => {
            mutate();
            handleOk();
          });
        }
      }}
      form={form}
      autoComplete="off"
    >
      <Form.Item label="Expense name" name="name" rules={[{ required: true, message: "Please enter expense name" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please enter date" }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter amount" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Categories" name="categories" rules={[{ required: true, message: "Please enter categories" }]}>
        <Select
          placeholder="categories"
          options={["rent", "food", "groceries", "entertainment", "productivity"].map((categories) => ({ label: categories, value: categories }))}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}
