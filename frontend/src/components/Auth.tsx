import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useLogin } from "@/hooks/data-fetching/useLogin";
import { useRouter } from "next/router";
import { setAuthKey } from "@/utils/auth-key";
import { useSignup } from "@/hooks/data-fetching/useSignup";
import { ErrorResponse, User } from "@/types";

export const Auth: React.FC = () => {
  const [type, setType] = useState("login");
  const { trigger: login } = useLogin();
  const { trigger: signup } = useSignup();
  const router = useRouter();

  // Write a function to submit the login/signup form
  const onFinish = (values: User) => {
    if (type === "login") {
      login(values)
        .then((data) => {
          setAuthKey(data.jwt);
          setTimeout(() => router.push("/portal"));
          message.success("Successfully logged in");
        })
        .catch((error: ErrorResponse) => {
          message.error(error?.error?.message);
        });
    } else {
      signup(values)
        .then((data) => {
          setAuthKey(data.jwt);
          setTimeout(() => router.push("/portal"));
          message.success("Successfully signed up");
        })
        .catch((error: ErrorResponse) => {
          message.error(error?.error?.message);
        });
    }
  };
  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <h1
        style={{
          textAlign: "center"
        }}
      >
        Welcome to FinSense
      </h1>

      <div
        style={{
          textAlign: "center"
        }}
      >
        {type === "login" ? (
          <>
            <Login />
            <Button
              style={{
                width: "100%"
              }}
              className="login-form-button"
              onClick={() => setType("signup")}
            >
              Sign up
            </Button>
          </>
        ) : (
          <>
            <Signup />
            <Button
              style={{
                width: "100%"
              }}
              className="login-form-button"
              onClick={() => setType("login")}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </Form>
  );
};

function Login() {
  return (
    <>
      <Form.Item name="identifier" rules={[{ required: true, message: "Please input your email!" }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item
        style={{
          textAlign: "center"
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%"
          }}
          className="login-form-button"
        >
          Log in
        </Button>
      </Form.Item>
    </>
  );
}

function Signup() {
  return (
    <>
      <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item
        style={{
          textAlign: "center"
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%"
          }}
          className="login-form-button"
        >
          Sign up
        </Button>
      </Form.Item>
    </>
  );
}
