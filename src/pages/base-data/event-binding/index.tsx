const EventBinding:React.FC = () => {
    const data1 ="on + 事件名称 = {()=>函数名称(实参)}";
    const data2 ="on + 事件名称 = {(event)=>函数名称(实参, event)}";
    return (
        <ul>
            <li> 
                <h2>事件绑定:</h2>
                <h3>on + 事件名称 = {"函数名称"}</h3> 
                <div className="m-16">
                    <div>
                        <img src="/images/base-image/event-binding1.png" alt="logo" />
                    </div>
                </div>
            </li>
            <li>
                 <h2>传递event事件:</h2>
                 <h3>在绑定的函数的箭头函数中直接设置形参event</h3>
                 <div className="m-16">
                    <div>
                        <img src="/images/base-image/event-binding2.png" alt="logo" />
                    </div>
                </div>
            </li>
            <li> 
                <h2>传入自定义参数:</h2>
                <h3>{data1}</h3> 
                <div className="m-16">
                    <div>
                        <img src="/images/base-image/event-binding3.png" alt="logo" />
                    </div>
                </div>
            </li>
            <li> 
                <h2>自定义参数+event事件:</h2>
                <h3>{data2}</h3> 
                <div className="m-16">
                    <div>
                        <img src="/images/base-image/event-binding4.png" alt="logo" />
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default EventBinding;