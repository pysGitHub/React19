import React, { useState } from 'react';

const EventBindingPage = () => {
  const [message, setMessage] = useState<string>('');
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    setMessage('按钮被点击了！');
    setCount(count + 1);
  };

  const handleReset = () => {
    setMessage('');
    setCount(0);
  };

  return (
    <div>
      <h2>事件绑定示例</h2>
      <p>点击下面的按钮来测试事件绑定：</p>
      
      <button onClick={handleClick}>
        点击我
      </button>
      
      <button onClick={handleReset} style={{ marginLeft: '10px' }}>
        重置
      </button>
      
      {message && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <p>{message}</p>
          <p>点击次数: {count}</p>
        </div>
      )}
    </div>
  );
};

export default EventBindingPage;