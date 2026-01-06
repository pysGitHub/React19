const RouterDefault: React.FC = () => {
    return (
        <ul>
            <li>
                <h3>1. 安装 React Router</h3>
                <div className="m-16">
                    <pre><code>npm install react-router-dom</code></pre>
                </div>
            </li>
            <li>
                <h3>2. 实现 createBrowserRouter 方法</h3>
                <div className="m-16">
                    <img src="/images/base-image/router1.png" alt="" />
                </div>
            </li>
            <li>
                <h3>3. 修改 main.ts, 引入router中的配置文件 </h3>
                <div className="m-16">
                    <div>
                        <img src="/images/base-image/router2.png" alt="" />
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default RouterDefault;