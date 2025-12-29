import { fromEvent, Observable } from 'rxjs';
import { map, distinctUntilChanged, startWith } from 'rxjs/operators';

/**
 * 监听屏幕宽度变化，当宽度小于指定值时返回true，否则返回false
 * @param width 阈值宽度，默认为640
 * @returns Observable<boolean> 根据屏幕宽度返回布尔值
 */
export function monitorScreenWidth(width: number = 640): Observable<boolean> {
  // console.log('方法被调用'); // 调试信息
  return fromEvent(window, 'resize').pipe(
    // 初始值：获取当前窗口宽度
    startWith(window.innerWidth),
    // 将事件转换为布尔值
    map(() => {
      console.log('屏幕宽度变化:', window.innerWidth, width); // 调试信息
      return window.innerWidth < width;
    }),
    // 仅在值发生变化时通知订阅者
    distinctUntilChanged()
  );
}