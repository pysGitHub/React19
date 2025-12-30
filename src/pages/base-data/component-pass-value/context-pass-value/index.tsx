import React, { useMemo } from "react";
import ContextComponentA from "./context-component-a";

export type PassItem = { key: string; text: string };
export const PassValueContext = React.createContext<PassItem[]>([]);

const ContextPassValue: React.FC = () => {
    const passValue = useMemo(() => [{ key: '1', text: 'context pass value' }], []);

    return (
        <>
            <h2>context Pass Value</h2>
            <PassValueContext.Provider value={passValue}>
                <ContextComponentA />
            </PassValueContext.Provider>
        </>
    )
}


export default ContextPassValue;