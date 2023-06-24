import { useGetTransactions } from "@/hooks/data-fetching/useGetTransactions";
import { useUser } from "@/hooks/data-fetching/useUser";
import { Button, Modal, Space, Statistic } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { useState } from "react";
import { TransactionModal } from "./TransactionModal";
import { useDeleteTransactions } from "@/hooks/data-fetching/useDeleteTransaction";
import { CSVLink, CSVDownload } from "react-csv";

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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => (
        <>
          <Tag color={type === "income" ? "green" : "red"}>{type.charAt(0).toUpperCase() + type.slice(1)}</Tag>
        </>
      )
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, { amount }) => <div>Rs. {amount}</div>
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Category",
      key: "categories",
      dataIndex: "categories",
      render: (_, { categories }) => <>{categories ? <Tag color={"blue"}>{categories?.charAt(0)?.toUpperCase() + categories?.slice(1)}</Tag> : "-"}</>
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
            style={{
              color: "tomato"
            }}
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

  const totalIncome = parsedData?.filter((data) => data?.type === "income")?.reduce((acc, data) => acc + data.amount, 0);

  const totalExpense = parsedData?.filter((data) => data?.type === "expense")?.reduce((acc, data) => acc + data.amount, 0);

  const csvData = [["Name", "Type", "Amount", "Date", "Category"]];

  parsedData?.forEach((d) => {
    csvData.push([d.name, d.type, String(d.amount), d.date, d.categories]);
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Statistic
          valueStyle={{
            color: "#85BB65"
          }}
          style={{
            marginRight: "4rem"
          }}
          title="Total income"
          value={totalIncome}
        />
        <br />
        <Statistic
          valueStyle={{
            color: "red"
          }}
          style={{
            marginRight: "4rem"
          }}
          title="Total expenses"
          value={totalExpense}
        />
        <br />
        <Statistic
          valueStyle={{
            color: "#1DA1F2"
          }}
          style={{
            marginRight: "4rem"
          }}
          title="Balance"
          value={totalIncome - totalExpense}
        />

        <div>
          <CSVLink filename={"FinSense-transactions.csv"} data={csvData}>
            <Button>Export as CSV</Button>
          </CSVLink>
        </div>
      </div>
      <br />
      {/* <div>
        {totalIncome} {totalExpense}
      </div> */}

      <Table columns={columns} dataSource={parsedData || []} loading={isLoading || !user?.id} pagination={false} />
      <Modal title="Edit transaction" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} destroyOnClose>
        <TransactionModal handleOk={handleOk} defaultValues={currentTrans} isEdit />
      </Modal>
    </>
  );
}
