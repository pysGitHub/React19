import React, { useState, useCallback } from 'react';

const UseCallBack: React.FC = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [otherState, setOtherState] = useState(0);

  // 没有使用 useCallback 的函数
  const normalFunction = () => {
    console.log('Normal function called');
    return count * 2;
  };

  // 使用 useCallback 的函数
  const useCallbackFunction = useCallback(() => {
    console.log('Function wrapped with useCallback called');
    return count * 2;
  }, [count]); // 仅当 count 改变时才重新创建函数

  // 模拟一个复杂计算函数
  const expensiveFunction = useCallback(() => {
    console.log('Expensive calculation executed');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result + count;
  }, [count]);

  // 每次渲染都创建新函数的版本（没有使用 useCallback）
  const nonOptimizedFunction = () => {
    console.log('This function is recreated on every render');
    return 'non-optimized';
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOtherStateChange = () => {
    setOtherState(otherState + 1);
  };

  return (
    <>
      <h1><strong>useCallback</strong></h1>
      <p>useCallback 是一个 React Hook，它可以缓存函数的实例，只有当依赖项发生变化时才重新创建函数。</p>
      
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
        <h3>示例说明：</h3>
        
        <div style={{ margin: '10px 0' }}>
          <p><strong>当前计数:</strong> {count}</p>
          <button onClick={handleIncrement}>增加计数</button>
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>
            <strong>输入框（用于触发重新渲染）:</strong><br />
            <input 
              type="text" 
              value={inputValue} 
              onChange={handleInputChange} 
              placeholder="输入一些文本以触发重新渲染"
            />
          </label>
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <p><strong>其他状态:</strong> {otherState}</p>
          <button onClick={handleOtherStateChange}>改变其他状态</button>
        </div>
        
        <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#f0f8ff' }}>
          <h4>比较 useCallback 和普通函数:</h4>
          
          <div style={{ margin: '10px 0' }}>
            <p>每次点击"增加计数"按钮，下面的按钮都会显示在控制台中被调用的信息：</p>
            <p>（打开浏览器控制台查看效果）</p>
          </div>
          
          <div style={{ margin: '10px 0' }}>
            <p>1. 普通函数（没有使用 useCallback）:</p>
            <button onClick={() => console.log('Normal function result:', normalFunction())}>
              调用普通函数
            </button>
          </div>
          
          <div style={{ margin: '10px 0' }}>
            <p>2. 使用 useCallback 的函数:</p>
            <button onClick={() => console.log('useCallback function result:', useCallbackFunction())}>
              调用 useCallback 函数
            </button>
          </div>
          
          <div style={{ margin: '10px 0' }}>
            <p>3. 复杂计算函数（使用 useCallback 优化）:</p>
            <button onClick={() => console.log('Expensive function result:', expensiveFunction())}>
              调用复杂计算函数
            </button>
          </div>
          
          <div style={{ margin: '10px 0' }}>
            <p>4. 非优化函数（每次渲染都重新创建）:</p>
            <button onClick={() => console.log('Non-optimized function result:', nonOptimizedFunction())}>
              调用非优化函数
            </button>
          </div>
        </div>
        
        <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#f5f5f5' }}>
          <h4>useCallback 的作用：</h4>
          <ul>
            <li><strong>性能优化：</strong>避免在每次渲染时都创建新的函数实例</li>
            <li><strong>防止不必要的子组件重渲染：</strong>当将函数作为 props 传递给子组件时，如果函数没有变化，子组件不会重新渲染</li>
            <li><strong>依赖项管理：</strong>只有当依赖项发生改变时，才会创建新函数</li>
            <li><strong>在 React.memo 中使用：</strong>与 React.memo 配合使用可以更有效地优化组件性能</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UseCallBack;