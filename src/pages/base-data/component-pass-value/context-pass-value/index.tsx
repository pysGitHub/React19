import React, { useMemo } from "react";
import ContextComponentA from "./context-component-a";

export type PassItem = { key: string; text: string };
export const PassValueContext = React.createContext<PassItem[]>([]);

const ContextPassValue: React.FC = () => {
    const passValue = useMemo(() => [{ key: '1', text: 'context pass value' }], []);

    return (
        <>
            <h2>context Pass Value</h2>
            <code>
                 <pre>
                    {`
                    1.  使用React.createContext()创建 一个context对象, 
                        例如 : const PassValueContext = React.createContext<PassItem[]>([]);
                    2.  使用Provider组件将数据传递给接收传值的组件, 
                        例如: 
                        const  passValue = useMemo(() => [{ key: '1', text: 'context pass value' }], []);
                        <PassValueContext.Provider value={passValue}>
                          <被包裹的组件 />
                        </PassValueContext.Provider>;
                    3.  在接收传值的组件中, 使用useContext()获取数据, 
                        例如: const passValue = useContext(PassValueContext);
                    `}
                </pre>
            </code>
            <PassValueContext.Provider value={passValue}>
                <ContextComponentA />
            </PassValueContext.Provider>
        </>
    )
}


export default ContextPassValue;