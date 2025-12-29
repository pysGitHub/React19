const HooksUseState: React.FC = () => {
    return (
        <>
            <h2><strong>useState 简介:</strong></h2>
            <ul className="m-t-24">
                <h2><strong>useState使用数组解构来命名状态变量，返回一个只包含2个项的数组:</strong></h2>
                <li>第一个元素是当前状态的 state</li>
                <li>第二个元素是用于更新状态的 set 函数</li>
                <li>例如: const [count, setCount] = useState(0);</li>
            </ul>
            <ul className="m-16">
                <li>
                    <h2><strong>状态不可变:</strong></h2>
                    <div>
                        <img src="/images/base-image/useState1.png" alt="" />
                    </div>
                </li>
                <li>
                    <h2><strong>对象状态更新:</strong></h2>
                    <div>
                        <img src="/images/base-image/useState2.png" alt="" />
                    </div>
                </li>
                <li>
                    <h2><strong>实现双向数据绑定:</strong></h2>
                    <div className="m-16" style={{color:'blue'}}>
                        <code>
                            <strong>{'onChange={e => setValue(e.target.value)}'}</strong>
                        </code>
                    </div>
                    <div>
                        <img src="/images/base-image/useState4.png" alt="" />
                    </div>
                </li>
            </ul>
        </>
    )
}

export default HooksUseState; 