const ConditionRender:React.FC = () => {
    return (
        <ul>
            <li> 
                <h3>1. 判断逻辑 + &&</h3> 
                <div className="m-16">
                    <div>
                        <img src="/images/base-image/condition-render1.png" alt="logo" />
                    </div>
                </div>
            </li>
            <li>
                 <h3>2. 判断逻辑 + 三元表达式</h3>
                 <div className="m-16">
                    <div>
                        <img src="/images/base-image/condition-render2.png" alt="logo" />
                    </div>
                </div>
            </li>
            <li> 
                <h3>3. 使用 自定义函数+if 判断返回对应的标签</h3> 
                <div className="m-16">
                    <div>
                        <img src="/images/base-image/condition-render3.png" alt="logo" />
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default ConditionRender;