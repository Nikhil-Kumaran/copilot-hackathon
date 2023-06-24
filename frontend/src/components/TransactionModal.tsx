// Component to create the transactions
"use-client";
import { useGetTransactions } from "@/hooks/data-fetching/useGetTransactions";
import { usePostTransactions } from "@/hooks/data-fetching/usePostTransaction";
import { useUpdateTransactions } from "@/hooks/data-fetching/useUpdateTransaction";
import { useUser } from "@/hooks/data-fetching/useUser";
import { Transaction } from "@/types";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";

export function TransactionModal({
  handleOk,
  defaultValues,
  isEdit = false
}: {
  handleOk: () => void;
  defaultValues?: Transaction & { id: string };
  isEdit?: boolean;
}) {
  const { trigger: createTrans, data, isMutating, error } = usePostTransactions();

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
          updateTrans({ data: { ...values, user: user.id } }).then(() => {
            mutate();
            handleOk();
          });
        } else {
          createTrans({ data: { ...values, user: user.id } }).then(() => {
            mutate();
            handleOk();
            form.resetFields();
          });
        }
      }}
      form={form}
      autoComplete="off"
    >
      <Form.Item label="Transaction name" name="name" rules={[{ required: true, message: "Please enter transaction name" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please enter date" }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter amount" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Transaction type" name="type" rules={[{ required: true, message: "Please select transaction type" }]}>
        <Select
          placeholder="Type"
          options={["income", "expense"].map((type) => ({ label: type.charAt(0).toUpperCase() + type.slice(1), value: type }))}
        />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}>
        {({ getFieldValue }) =>
          getFieldValue("type") === "expense" ? (
            <Form.Item label="Categories" name="categories" rules={[{ required: true, message: "Please select category" }]}>
              <Select
                placeholder="categories"
                options={["rent", "food", "groceries", "entertainment", "productivity"].map((categories) => ({
                  label: categories.charAt(0).toUpperCase() + categories.slice(1),
                  value: categories
                }))}
              />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      {/* <Form.Item label="Categories" name="categories" rules={[{ required: true, message: "Please select category" }]}>
        <Select
          placeholder="categories"
          options={["rent", "food", "groceries", "entertainment", "productivity"].map((categories) => ({
            label: categories.charAt(0).toUpperCase() + categories.slice(1),
            value: categories
          }))}
        />
      </Form.Item> */}

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}
