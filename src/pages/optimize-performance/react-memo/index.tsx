import { useState, useEffect, memo, useMemo } from 'react';

// 未使用 React.memo 包装的组件
const ChildComponentWithoutMemo = ({ name, renderCount }: { name: string; renderCount: number }) => {
  console.log(`ChildComponentWithoutMemo ${name} is rendering`);
  
  return (
    <div style={{ padding: '10px', margin: '10px', border: '1px solid #ccc' }}>
      <h3>未使用 React.memo 包装的组件: {name}</h3>
      <p>渲染次数: {renderCount}</p>
    </div>
  );
};

// 使用 React.memo 包装的组件
const ChildComponentWithMemo = memo(({ name, renderCount }: { name: string; renderCount: number }) => {
  console.log(`ChildComponentWithMemo ${name} is rendering`);
  
  return (
    <div style={{ padding: '10px', margin: '10px', border: '1px solid blue' }}>
      <h3>使用 React.memo 包装的组件: {name}</h3>
      <p>渲染次数: {renderCount}</p>
    </div>
  );
});

const ReactMemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [inputValue, setInputValue] = useState('');
  
  // 计算渲染次数的值
  const expensiveValue = useMemo(() => {
    console.log('Expensive calculation running...');
    return count * 2;
  }, [count]);

  return (
    <>
      <h1>React.memo 性能优化示例</h1>
      <p>React.memo 是一个高阶函数，用于优化函数组件的性能。它会浅比较 props，如果 props 没有变化，则跳过重新渲染，使用缓存的组件结果。</p>
      
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => setCount(count + 1)}>增加计数: {count}</button>
        <button onClick={() => setShow(!show)} style={{ marginLeft: '10px' }}>切换显示: {show ? 'true' : 'false'}</button>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="输入一些文本测试重新渲染"
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      
      <div>
        <h2>对比演示:</h2>
        <p>每次点击按钮或输入文本时，父组件会重新渲染，但使用 React.memo 的子组件只有在 props 改变时才会重新渲染。</p>
        
        {/* 未使用 React.memo 的组件 */}
        <ChildComponentWithoutMemo name="Without Memo" renderCount={count} />
        
        {/* 使用 React.memo 的组件 */}
        <ChildComponentWithMemo name="With Memo" renderCount={count} />
        
        {/* 两个组件 props 不变，但父组件重新渲染时会受影响 */}
        <ChildComponentWithoutMemo name="Another Without Memo" renderCount={expensiveValue} />
        <ChildComponentWithMemo name="Another With Memo" renderCount={expensiveValue} />
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h3>React.memo 的作用:</h3>
        <ul>
          <li>React.memo 是一个高阶函数，用于优化函数组件的渲染性能</li>
          <li>它会浅比较组件的 props，如果 props 没有发生变化，则跳过组件的渲染过程，直接使用之前渲染的结果</li>
          <li>这可以避免不必要的重新渲染，提升应用性能</li>
          <li>仅在 props 或内部 state 发生变化时才重新渲染</li>
          <li>可以传入第二个参数，自定义比较函数来决定何时重新渲染</li>
        </ul>
      </div>
    </>
  );
}

export default ReactMemo;