import { useActionState, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStatus } from 'react-dom';
import './index.scss'


// 定义登录动作函数
async function loginAction(_: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  // 用户名不区分大小写比较
  if (username.toLowerCase() === 'thomas_pan' && password === '112233') {
    return { success: true, error: null };
  } else {
    return { success: false, error: '用户名或密码错误' };
  }
}

// 提交按钮组件，使用useFormStatus获取表单状态
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="submitButton"
    >
      {pending ? '登录中...' : '登录'}
    </button>
  );
}

const Login: React.FC = () => {
  const [state, formAction, isPending] = useActionState(loginAction, { success: false, error: null });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // 当登录成功时跳转到/layout页面
  if (state.success) {
    setTimeout(() => {
      navigate('/layout');
    }, 100);
  }

  // 显示错误信息时的处理
  if (state.error && !showError) {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000); // 3秒后隐藏错误信息
  }

  return (
    <div
      className='bgView'
    >
      <div
        className='bgContent'
      >
        <h1
          className='title'
        >用户登录</h1>

        {showError && state.error && (
          <div
            className='errMsg'
          >
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <div className='userName'>
            <label htmlFor="username">
              用户名:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
            />
          </div>

          <div className='password'>
            <label htmlFor="password">
              密码:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default Login;