import { Link, NavLink } from "react-router-dom";

const RouterPassValue: React.FC = () => {
    return (
        <>
            <ul>
                <h2><strong>路由导航方式</strong></h2>
                <li>
                    <h3>1. Link 组件：<code style={{color:'blue'}}>{`<Link to="对应的跳转路径"></Link>`}</code></h3>
                    <div className="m-16">
                        <img src="/images/base-image/router4.png" alt="" />
                    </div>
                </li>
                <li>
                    <h3>2. NavLink 组件（带激活状态）</h3>
                    <div className="m-16">
                        <img src="/images/base-image/router5.png" alt="" />
                    </div>
                </li>
                <li>
                    <h3>3. 编程式导航（useNavigate） </h3>
                    <div className="m-16">
                        <div>
                            <img src="/images/base-image/router6.png" alt="" />
                        </div>
                    </div>
                </li>
                <li>
                    <h3>4. 跳转到默认组件，且浏览器地址显示路径</h3>
                    <div className="m-16">
                        <img src="/images/base-image/router7.png" alt="" />
                    </div>
                </li>
            </ul>




            <ul className="m-t-24">
                <h2><strong style={{color: '#0d759f'}}>路由传参</strong></h2>
                <li>
                    <h3>1.  动态路由参数（URL 参数）</h3>
                    <div className="m-16">
                        <img src="/images/base-image/router8.png" alt="" />
                     </div>
                </li>
                <li>
                    <h3>2. 查询参数（Query Parameters）</h3>
                    <div className="m-16">
                        <img src="/images/base-image/router9.png" alt="" />
                    </div>
                </li>
                <li>
                    <h3>3. 状态传递（State） </h3>
                    <div className="m-16">
                        <div>
                            <img src="/images/base-image/router10.png" alt="" />
                        </div>
                    </div>
                </li>
            </ul>

        </>
    )
}


export default RouterPassValue;