import { Button } from "antd";

interface SonSendDataProps { 
    onSendData: (data:object)=>void
}


const SonSendData:React.FC<SonSendDataProps> = (props: SonSendDataProps) => { 
    const {onSendData} = props;

    const data = {name:'张三', age:18}

    return (
        <div>
            <div>子组件 Son SendData</div>
            
            <Button onClick={()=>onSendData(data)}>
                子组件向父组件传数据
            </Button>
        </div>
    )
}

export default SonSendData;