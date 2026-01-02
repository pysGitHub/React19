import React, { useRef, forwardRef, useImperativeHandle } from 'react';

// 示例1: 基本的forwardRef用法
interface InputRefProps {
  placeholder?: string;
  type?: string;
}

interface InputRefHandles {
  focus: () => void;
  clear: () => void;
}

const CustomInput = forwardRef<InputRefHandles, InputRefProps>(({ placeholder, type = 'text' }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 使用useImperativeHandle暴露特定方法给父组件
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }));

  return <input ref={inputRef} type={type} placeholder={placeholder} />;
});

// 示例2: 没有暴露方法的forwardRef
const SimpleInput = forwardRef<HTMLInputElement, InputRefProps>(({ placeholder, type = 'text' }, ref) => {
  return <input ref={ref} type={type} placeholder={placeholder} />;
});

// 示例3: 使用forwardRef的按钮组件
interface ButtonHandles {
  click: () => void;
  resetFocus: () => void;
}

const CustomButton = forwardRef<ButtonHandles, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    click: () => buttonRef.current?.click(),
    resetFocus: () => buttonRef.current?.blur()
  }));

  return <button ref={buttonRef} {...props} />;
});

const HooksForwardRef: React.FC = () => {
  const customInputRef = useRef<InputRefHandles>(null);
  const simpleInputRef = useRef<HTMLInputElement>(null);
  const customButtonRef = useRef<ButtonHandles>(null);

  const handleFocusCustom = () => {
    customInputRef.current?.focus();
  };

  const handleClearCustom = () => {
    customInputRef.current?.clear();
  };

  const handleFocusSimple = () => {
    simpleInputRef.current?.focus();
  };

  const handleButtonClick = () => {
    customButtonRef.current?.click();
  };

  return (
    <div>
      <h1><strong>forwardRef</strong></h1>
      
      <section className='m-t-24'>
        <h2>1. 基本概念</h2>
        <ul>
          <li><strong>forwardRef</strong> 是一个函数，用于将父组件的 ref 转发到其子组件的 DOM 元素或组件实例上</li>
          <li>允许父组件直接访问子组件内部的 DOM 元素</li>
          <li>在函数组件中使用，因为函数组件本身不能接收 ref（除非使用 forwardRef）</li>
          <li>解决函数组件不能接收 ref 的限制</li>
        </ul>
      </section>

      <section className='m-t-24'>
        <h2>2. 语法</h2>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`const Component = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});`}
        </pre>
      </section>

      <section className='m-t-24'>
        <h2>3. 实际应用示例</h2>
        
        <h3>3.1 自定义输入框组件（暴露方法）</h3>
        <div>
          <CustomInput ref={customInputRef} placeholder="自定义输入框（可调用方法）" />
          <br />
          <button onClick={handleFocusCustom} style={{ marginRight: '10px' }}>聚焦</button>
          <button onClick={handleClearCustom}>清空</button>
        </div>

        <h3>3.2 简单转发 ref 到 DOM 元素</h3>
        <div>
          <SimpleInput ref={simpleInputRef} placeholder="简单输入框（直接访问DOM）" />
          <br />
          <button onClick={handleFocusSimple}>聚焦简单输入框</button>
        </div>

        <h3>3.3 自定义按钮组件（暴露方法）</h3>
        <div>
          <CustomButton ref={customButtonRef} onClick={() => alert('按钮被点击了！')}>
            自定义按钮
          </CustomButton>
          <br />
          <button onClick={handleButtonClick} style={{ marginTop: '10px' }}>通过ref触发点击</button>
        </div>
      </section>

      <section className='m-t-24'>
        <h2>4. forwardRef 与 useImperativeHandle 配合使用</h2>
        <p>useImperativeHandle 可以让你在使用 forwardRef 时自定义暴露给父组件的实例值。</p>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`useImperativeHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
  clear: () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }
}));`}
        </pre>
      </section>

      <section className='m-t-24'>
        <h2>5. React 19 中的改进</h2>
        <ul>
          <li>更好的类型推断支持</li>
          <li>更好的错误处理</li>
          <li>更好的性能优化</li>
          <li>与新的 React 编译器兼容</li>
        </ul>
      </section>

      <section className='m-t-24'>
        <h2>6. 使用场景</h2>
        <ul>
          <li><strong>访问子组件的 DOM 元素</strong>：例如，父组件需要直接操作子组件中的 input 元素以执行 focus 或 blur 操作</li>
          <li><strong>调用子组件的特定方法</strong>：通过 useImperativeHandle 暴露特定方法给父组件</li>
          <li><strong>构建可复用的组件库</strong>：使组件更灵活，允许父组件在需要时直接访问底层 DOM</li>
          <li><strong>动画和焦点管理</strong>：在父组件中控制子组件的动画或焦点状态</li>
        </ul>
      </section>

      <section className='m-t-24'>
        <h2>7. 注意事项</h2>
        <ul>
          <li>应该谨慎使用，过度使用可能会破坏组件的封装性</li>
          <li>在大多数情况下，应该优先考虑使用 props 和 state 来实现组件交互</li>
          <li>只有在确实需要直接访问 DOM 或子组件实例时才使用 forwardRef</li>
          <li>forwardRef 不会创建新的组件实例，它只是转发 ref 属性</li>
          <li>使用 TypeScript 时，要正确设置泛型参数以获得类型安全</li>
        </ul>
      </section>

      <section>
        <h2>8. 最佳实践</h2>
        <ul>
          <li>尽可能避免使用 ref，优先使用 props 通信</li>
          <li>当必须使用 ref 时，清晰地记录组件暴露的 API</li>
          <li>使用 TypeScript 提供明确的类型定义</li>
          <li>只暴露必要的方法，避免暴露内部实现细节</li>
          <li>在组件文档中说明 ref 转发的用法</li>
        </ul>
      </section>
    </div>
  );
};

export default HooksForwardRef;