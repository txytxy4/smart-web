import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { login, register } from "@/api/user/user";
import type { LoginRequest, RegisterRequest } from "@/api/user/user.type";
import styles from "./login.module.scss";
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
};

const Login = () => {
  const navigate = useNavigate();
  // rules
  const nameRules = [
    {
      required: true,
      message: "请输入用户名!",
    },
  ];
  const passwordRules = [
    {
      required: true,
      message: "请输入密码!",
    },
  ];

  //表单内容
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState("");
  const [isResigter, setIsResigter] = useState(false);

  const save = async () => {
    try {
      const data: LoginRequest | RegisterRequest = {
        username,
        password,
        email: isResigter ? email : undefined,
      };
      const handle = isResigter ? register : login;
      const res = await handle(data);
      console.log("res", res);
      if (res.code === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", String(res.data.id));
        navigate("/index/home");
      } else {
        console.log("message", res.message);
      }
    } catch (e) {
      console.log("err", e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgWrap}></div>
      <div className={styles.formWrap}>
        <Form
          className={styles.formContainer}
          layout="vertical"
          initialValues={{username: '', password: ''}}
        >
          <p className={styles.formTitle}>{isResigter ? "注册" : "登录"}</p>
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={nameRules}
          >
            <Input
              placeholder="请输入用户名或邮箱"
              value={username}
              styles={{input: {width: '250px'}}}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={passwordRules}
          >
            <Input
              placeholder="请输入密码"
              value={password}
              styles={{input: {width: '250px'}}}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </Form.Item>

          {isResigter && (
            <Form.Item<FieldType> label="邮箱" name="email">
              <Input
                placeholder="请输入邮箱"
                value={email}
                styles={{input: {width: '250px'}}}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" block onClick={save}>{isResigter ? "注册" : "登录"}</Button>
          </Form.Item>
          <div className={styles.formFooter}>
            {isResigter ? "已有账号？" : "还没有账号？"}
            <span
              className={styles.formFooterTips}
              onClick={() => setIsResigter(!isResigter)}
            >
              {isResigter ? "登录" : "注册用户"}
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
