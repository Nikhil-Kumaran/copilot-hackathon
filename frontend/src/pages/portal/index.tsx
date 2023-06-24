import React, { useEffect, useState } from "react";
import { DesktopOutlined, FileOutlined, LockOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, Modal, Spin, theme } from "antd";
import { TransactionModal } from "@/components/TransactionModal";
import { TransactionsTable } from "@/components/TransactionsTable";
import { useRouter } from "next/router";
import { getAuthKey, removeAuthKey } from "@/utils/auth-key";
import { Reports } from "@/components/Report";
import { useUser } from "@/hooks/data-fetching/useUser";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

export default function Portal() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const { data: user } = useUser();

  useEffect(() => {
    if (!getAuthKey()) {
      router.push("/");
    }
  }, []);

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("transactions");

  useEffect(() => {
    if (selectedMenu === "logout") {
      removeAuthKey();
      router.push("/");
    }
  }, [selectedMenu]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: MenuItem[] = [
    getItem("Transactions", "transactions", <FileOutlined />),
    getItem("Report", "report", <PieChartOutlined />),
    getItem("Logout", "logout", <LockOutlined />)
  ];

  if (!user?.id || selectedMenu === "logout") {
    return (
      <Spin
        style={{
          position: "absolute",
          left: "50%",
          top: "50%"
        }}
      />
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          onSelect={(value) => {
            setSelectedMenu(value.key);
          }}
          theme="dark"
          defaultSelectedKeys={["transactions"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div className="demo-logo">Finance tracker</div>
            <div
              style={{
                marginRight: "2rem",
                fontWeight: "600"
              }}
            >
              {user?.email}
            </div>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          {selectedMenu === "transactions" ? (
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              <Button
                onClick={showModal}
                style={{
                  marginBottom: "2rem"
                }}
              >
                Create transaction
              </Button>

              <TransactionsTable />
            </div>
          ) : selectedMenu === "report" ? (
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              <Reports />
            </div>
          ) : null}
        </Content>
      </Layout>

      <Modal title="Create transaction" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <TransactionModal handleOk={handleOk} />
      </Modal>
    </Layout>
  );
}
