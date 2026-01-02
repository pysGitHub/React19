import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';



const HooksUseRef: React.FC = () => {
    // 1. 获取Dom元素
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        // 组件挂载后自动聚焦输入框
        inputRef.current?.focus();
    }, []);

    const handleClick = () => {
        // 手动聚焦输入框
        inputRef.current?.focus();
    };


    // 2. 存储可变的值
    const [count, setCount] = useState(0);
    const previousCountRef = useRef(count);

    const increment = () => {
        previousCountRef.current = count; // 保存之前的值
        // setCount(count + 1);
        // 这里的 setCount(prevCount => prevCount + 1) 是为了确保在异步更新状态时，能够正确获取到最新的 count 值
        // 因为 React 的状态更新是异步的，所以直接使用 setCount(count + 1) 可能会导致获取到旧的 count 值
        // 使用函数式更新可以确保每次都基于最新的状态进行更新
        setCount(count => count + 1); // 使用函数式更新
        // 这里的 console.log 会输出旧的 count 值，因为 setCount 是异步的
        console.log('调用 setCount后获取到的 count 值是: \n', count);
    };


    // 3. 保存定时器id
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const startTimer = () => {
        if (intervalRef.current) return; // 防止重复启动
        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const resetTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setSeconds(0);
    };

    // 组件卸载时清理定时器
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);


    const onChange = (key: string) => {
        console.log('current key: \n', key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '获取Dom元素',
            children: (
                <div>
                    <input ref={inputRef} type="text" placeholder="点击按钮聚焦我" />
                    <br />
                    <Button className='m-t-8' onClick={handleClick}>聚焦输入框</Button>
                </div>
            ),
        },
        {
            key: '2',
            label: '存储可变的值',
            children: (
                <div>
                    <p>当前计数: {count}</p>
                    <p>上一次计数: {previousCountRef.current}</p>
                    <Button className='m-t-8' onClick={increment}>增加</Button>
                </div>
            ),
        },
        {
            key: '3',
            label: '保存定时器id',
            children: (
                <div>
                    <p>计时器: {seconds} 秒</p>
                    <button onClick={startTimer}>开始</button>
                    <button onClick={stopTimer}>停止</button>
                    <button onClick={resetTimer}>重置</button>
                </div>
            ),
        },
    ];
    return (
        <>
            <h2 className="m-b-24"><strong>useRef 简介:</strong></h2>
            <ul>
                <li>1. useRef 用于创建一个可变的应用对象</li>
                <li>2. useRef 返回一个可变的 ref 对象， 其 .current 属性被初始化为传入的参数</li>
                <li>3. useRef 对象在组件的整个生命周期内保持不变</li>
                <li>4. 基本形式: const refContainer = useRef(initialValue);</li>
            </ul>

            <h2 className="m-t-24"><strong>主要用途</strong></h2>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

        </>
    )
}

export default HooksUseRef;