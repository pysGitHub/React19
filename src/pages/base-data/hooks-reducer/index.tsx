import React, { useReducer } from 'react';

// 定义状态的类型
type CounterState = {
    count: number;
    step: number;
};

// 初始状态
const initialState: CounterState = {
    count: 0,
    step: 1,
};

// 定义可能的 action 类型
// {} | {}: 整体表示 CounterAction 类型可以是两种对象类型中的任意一种
type CounterAction =
    | { type: 'increment' | 'decrement' | 'reset' }
    | { type: 'setStep'; payload: number };



// Reducer 函数
function counterReducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + state.step };
        case 'decrement':
            return { ...state, count: state.count - state.step };
        case 'reset':
            return { ...initialState };
        case 'setStep':
            return { ...state, step: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action}`);
    }
}

const HooksUseReducer: React.FC = () => {

    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <div>
            <h2><strong>useReducer 简介:</strong></h2>
            <div className='m-t-24'>
                <div>
                    <strong>[state, dispatch] = useReducer(reducer, initialState, init?);</strong>
                    <p><strong>state</strong>: 当前状态</p>
                    <p><strong>dispatch</strong>: 派发一个 action，触发 reducer 函数，并更新 state</p>
                    <p><strong>reducer</strong>: 纯函数，接收 state 和 action，返回新的 state</p>
                    <p><strong>initialState</strong>: 初始状态</p>
                    <p><strong>可选参数 init</strong>: 用于计算初始值的函数。如果存在，使用 init(initialArg) 的执行结果作为初始值，否则使用 initialArg。</p>
                </div>
                <ul>
                    <li><strong>useReducer</strong> 是 React 中用于复杂状态逻辑管理的 Hook</li>
                    <li>它适用于<strong>状态逻辑复杂</strong>、<strong>状态依赖前一个状态值</strong>或<strong>状态更新需要多个子值</strong>的场景</li>
                    <li>它接收三个参数：<code>reducer</code> 函数、<code>初始状态</code> 和可选的 <code>初始化函数</code></li>
                    <li>返回一个包含当前状态和 dispatch 函数的数组</li>
                    <li>它比 useState 更适合处理复杂的状态转换逻辑</li>
                </ul>
            </div>


            <div className='m-t-24'>
                <h2><strong>计数器示例</strong></h2>
                <p>当前计数: <span>{state.count}</span></p>
                <p>步长: <span>{state.step}</span></p>

                <div>
                    <button
                        onClick={() => dispatch({ type: 'increment' })}
                    >
                        增加 ({state.step})
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'decrement' })}
                    >
                        减少 ({state.step})
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'reset' })}
                    >
                        重置
                    </button>
                </div>

                <div>
                    <label htmlFor="step">设置步长: </label>
                    <input
                        id="step"
                        type="number"
                        value={state.step}
                        onChange={(e) =>
                            dispatch({
                                type: 'setStep',
                                payload: Number(e.target.value)
                            })
                        }
                        min="1"
                        max="10"
                    />
                </div>
            </div>
        </div>
    );
};

export default HooksUseReducer;



