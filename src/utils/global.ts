import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

// 定义全局状态管理类
class GlobalState {
  // 存储多个状态的 BehaviorSubject
  private stateSubjects: Map<string, BehaviorSubject<any>> = new Map();

  // 存储订阅对象
  private subscriptions: Map<string, Subscription[]> = new Map();

  /**
   * 设置状态
   * @param key 状态的唯一标识
   * @param value 状态的值
   */
  setState<T>(key: string, value: T): void {
    if (!this.stateSubjects.has(key)) {
      this.stateSubjects.set(key, new BehaviorSubject<T>(value));
    } else {
      this.stateSubjects.get(key)?.next(value);
    }
  }

  /**
   * 获取状态的 Observable
   * @param key 状态的唯一标识
   * @returns Observable
   */
  getState<T>(key: string): Observable<T> {
    if (!this.stateSubjects.has(key)) {
      this.stateSubjects.set(key, new BehaviorSubject<T>(null as any));
    }
    return this.stateSubjects.get(key)!.asObservable();
  }

  /**
   * 添加订阅
   * @param key 状态的唯一标识
   * @param subscription 订阅对象
   */
  addSubscription(key: string, subscription: Subscription): void {
    if (!this.subscriptions.has(key)) {
      this.subscriptions.set(key, []);
    }
    this.subscriptions.get(key)?.push(subscription);
  }

  /**
   * 取消某个状态的所有订阅
   * @param key 状态的唯一标识
   */
  unsubscribeByKey(key: string): void {
    if (this.subscriptions.has(key)) {
      this.subscriptions.get(key)?.forEach(sub => sub.unsubscribe());
      this.subscriptions.delete(key);
    }
  }

  /**
   * 清理所有状态和订阅
   */
  clearAll(): void {
    // 取消所有订阅
    this.subscriptions.forEach(subs => {
      subs.forEach(sub => sub.unsubscribe());
    });
    
    // 清空订阅和状态
    this.subscriptions.clear();
    this.stateSubjects.clear();
  }
}

// 创建全局实例
const globalInstance = new GlobalState();

// 创建 React Context
const GlobalContext = createContext<GlobalState>(globalInstance);

// 创建 Provider 组件
export function GlobalProvider({ children }: { children: ReactNode }) {
  return GlobalContext.Provider({ value: globalInstance, children });
}

// 自定义 hook 用于访问全局状态
export function useGlobal() {
  return useContext(GlobalContext);
}

// 默认导出全局实例，可以直接使用
export default globalInstance;