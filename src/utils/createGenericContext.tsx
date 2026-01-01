import React from 'react';

/**
 * context 通用传值:
 * 
 * createGenericContext - 返回一个类型安全的 context hook 和一个 Provider 组件
 * 用法：
 * const [useMyCtx, MyProvider] = createGenericContext<MyType>();
 * 在 Provider 处使用： <MyProvider value={value}>...</MyProvider>
 * 在子组件中使用： const value = useMyCtx();
 */
export function createGenericContext<T>() {
    const Context = React.createContext<T | undefined>(undefined);

    function useGenericContext(): T {
        const ctx = React.useContext(Context);
        if (ctx === undefined) {
            throw new Error('useGenericContext must be used within its Provider');
        }
        return ctx;
    }

    const Provider: React.FC<{ value: T; children?: React.ReactNode }> = ({ value, children }) => (
        <Context.Provider value={value}>{children}</Context.Provider>
    );

    return [useGenericContext, Provider] as const;
}

export default createGenericContext;




/**
 *  使用的方式：
 *  (ContextPassValue-> ContextComponentA-> ContextComponentB)
 *  组件ContextPassValue向组件B进行传值
 

=== ContextPassValue 组件 ===


import React, { useMemo } from "react";
import ContextComponentA from "./context-component-a";
import { createGenericContext } from "../../../../utils/createGenericContext";

export type PassItem = { key: string; text: string };
// 使用通用上下文工厂，得到 hook 和 Provider
const [usePassValue, PassValueProvider] = createGenericContext<PassItem[]>();
export { usePassValue, PassValueProvider };

const ContextPassValue: React.FC = () => {
    const passValue = useMemo(() => [{ key: '1', text: 'context pass value' }], []);

    return (
        <>
            <h2>context Pass Value</h2>
            <PassValueProvider value={passValue}>
                <ContextComponentA />
            </PassValueProvider>
        </>
    )
}
export default ContextPassValue;




=== ContextComponentA 组件 ===


import ContextComponentB from "../context-component-b";

const ContextComponentA:React.FC = ()=> {
    return (
        <div>
            <h1>Component A</h1>
            <ContextComponentB />
        </div>
    )
}


export default ContextComponentA;





=== ContextComponentB 组件 ===



import React from 'react';
import { usePassValue } from '../index';
import type { PassItem } from '../index';

const ContextComponentB:React.FC = ()=> {
    const items: PassItem[] = usePassValue();

    return (
        <div>
            <h1>Component B</h1>
            <ul>
                {items.map(item => (
                    <li key={item.key}>{item.text}</li>
                ))}
            </ul>
        </div>
    )
}


export default ContextComponentB;

*/