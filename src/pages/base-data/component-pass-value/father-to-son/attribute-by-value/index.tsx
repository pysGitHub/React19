import { Button } from "antd";
import type React from "react";

interface AttributeByValueProps {
    name: string;
    updateName: (data:string) => void;
    onChange: (data: string) => void;
 }


const attributeByValue:React.FC<AttributeByValueProps> = (props: AttributeByValueProps) => {
    const {name, updateName, onChange} = props;
     
    return (
        <div className="m-24">
            <div>子组件 Son Default</div>
            <div>父组件传入的 name: {name}</div> 
            <Button className="m-b-16" onClick={()=>updateName('李四')}>调用父组件setName, 更新name</Button>
            <br />
            <Button onClick={() => onChange('王五')}>调用父组件传入的 onChange 方法,更新name</Button>
        </div>
    )
}


export default attributeByValue;