import SonSendData from "./son-send-data";

const SonToFather: React.FC = () => {
    const onSendData = (data:object) => { 
        alert(`子组件向父组件传数据${JSON.stringify(data)}`)
        console.log('子组件向父组件传数据: \n', data)
    }


    return (
        <>
            <h2><strong>组件传值: 子传父</strong></h2>
            <ul className="m-t-24">
                <li>
                    <h2><strong>属性传值</strong></h2>
                    <div>
                        <img src="/images/base-image/son-to-father.png" alt="" />
                    </div>

                    <SonSendData onSendData={onSendData}></SonSendData>
                </li>
            </ul>
        </>
    )
}


export default SonToFather;