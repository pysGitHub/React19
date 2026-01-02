import { useState, useMemo } from 'react';

const UseMemo:React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // 没有使用 useMemo 的昂贵计算函数
  const expensiveCalculateWithoutMemo = () => {
    const startTime = Date.now();
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += i;
    }
    const endTime = Date.now();
    console.log('计算未使用 useMemo 耗时:\n', endTime - startTime);
    return result;
  };

  // 使用了 useMemo 的昂贵计算函数
  const expensiveCalculateWithMemo = useMemo(() => {
    const startTime = Date.now();
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += i;
    }
    const endTime = Date.now();
    console.log('计算使用 useMemo 耗时:\n', endTime - startTime);
    return result;
  }, [count]); // 只有当 count 变化时才重新计算

  // 依赖项数组中的值改变时才会重新计算
  const calculateWithDependencies = useMemo(() => {
    console.log('依赖项计算执行');
    return count * 2;
  }, [count]);

  return (
    <>
      <h1><strong>UseMemo</strong></h1>
      <div>
        <p>Count: {count}</p>
        <p>Other State: {otherState}</p>
        <p>昂贵计算结果 (使用 useMemo): {expensiveCalculateWithMemo}</p>
        <p>依赖项计算结果 (count * 2): {calculateWithDependencies}</p>
        <p>未使用 useMemo 的昂贵计算: {expensiveCalculateWithoutMemo()}</p>
        
        <button onClick={() => setCount(count + 1)}>增加 Count</button>
        <button onClick={() => setOtherState(otherState + 1)}>增加 Other State</button>
      </div>
      
      <ul>
        <li><strong>useMemo 作用:</strong> useMemo 是一个 React Hook，它可以在依赖项不变时缓存计算结果，避免重复执行昂贵的计算操作。</li>
        <li><strong>性能优化:</strong> 当组件重新渲染但依赖项没有改变时，useMemo 会返回缓存的结果，避免不必要的计算。</li>
        <li><strong>何时使用:</strong> 适用于复杂计算、对象或数组的创建等耗时操作。</li>
        <li><strong>依赖数组:</strong> 只有当依赖数组中的值发生变化时，才会重新执行计算。</li>
        <li><strong>对比效果:</strong> 点击"增加 Count"按钮会触发 useMemo 重新计算，而点击"增加 Other State"不会触发。</li>
      </ul>
    </>
  )
}

export default UseMemo;