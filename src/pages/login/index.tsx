import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../../axios/api';
import './index.scss';

interface UserInfo {
  code: number,
  message: string,
  permissions: string,
  success: boolean,
  token: string,
  refresh_token: string
}

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [apiMessage, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      const response: UserInfo = await api.post('/login', values);

      if (response.code === 200 && response.success) {
        // 存储token到localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('refresh_token', response.refresh_token);

        // 成功提示
        apiMessage.open({
          type: 'success',
          content: '登录成功！',
        });

        // 延迟跳转到看板页面
        setTimeout(() => {
          navigate('/kanban');
        }, 1000);
      } else {
        // 登录失败，显示错误信息
        apiMessage.open({
          type: 'error',
          content: response.message || '用户名或密码错误',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bgView'>
      <div className='bgContent'>
        {contextHolder}
        <h1 className='title'>用户登录</h1>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', flexDirection: 'column' }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
              >
                登录
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;