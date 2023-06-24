import { useGetTransactions } from "@/hooks/data-fetching/useGetTransactions";
import { useUser } from "@/hooks/data-fetching/useUser";
import { Modal, Space } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { useState } from "react";
import { TransactionModal } from "./TransactionModal";
import { useDeleteTransactions } from "@/hooks/data-fetching/useDeleteTransaction";

export function TransactionsTable() {
  const { data: user } = useUser();
  const { data, isLoading, error, mutate } = useGetTransactions(user?.username);
  const { trigger: deleteTrans } = useDeleteTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrans, setCurrentTrans] = useState(undefined);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentTrans(undefined);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentTrans(undefined);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "categories",
      key: "categories",
      dataIndex: "categories",
      render: (_, { categories }) => (
        <>
          <Tag color={"green"}>{categories}</Tag>
        </>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setIsModalOpen(true);
              setCurrentTrans(record);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              Modal.confirm({
                title: "Delete transaction",
                content: "Are you sure you want to delete this transaction?",
                okText: "Yes",
                cancelText: "No",
                onOk: () => {
                  deleteTrans(record?.id).then(() => {
                    mutate();
                  });
                }
              });
            }}
          >
            Delete
          </a>
        </Space>
      )
    }
  ];
  const parsedData = data?.data?.map((d) => ({ ...d.attributes, id: d.id }));
  console.log("data", data, isLoading, error, parsedData, currentTrans);

  return (
    <>
      <Table columns={columns} dataSource={parsedData || []} loading={isLoading} pagination={false} />

      <Modal title="Edit transaction" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} destroyOnClose>
        <TransactionModal handleOk={handleOk} defaultValues={currentTrans} isEdit />
      </Modal>
    </>
  );
}
