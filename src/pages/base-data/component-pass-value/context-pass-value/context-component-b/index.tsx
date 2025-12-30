import React, { useContext } from 'react';
import { PassValueContext } from '../index';
import type { PassItem } from '../index';

const ContextComponentB:React.FC = ()=> {
    const items: PassItem[] = useContext(PassValueContext);

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