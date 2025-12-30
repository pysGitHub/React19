import ContextComponentB from "../context-component-b";

const ContextComponentA:React.FC = ()=> {
    return (
        <div>
            <h1>Component A</h1>
            <ContextComponentB />
        </div>
    )
}


export default ContextComponentA;