import { useSyncExternalStore } from "react";

export const useStorage = (key: any, defaultValue?: any) => {
    const subscribe = (callback: () => void) => {
        window.addEventListener('storage', (e) => {
            console.log('触发了：', e);
            callback()
        })
        return () => window.removeEventListener('storage', callback)
    };
    // 从localStorage中获取数据， 没有则返回默认值
    const getShapshot = () => {
        return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null) || defaultValue
    }

    const setStorage = (value: any) => {
        localStorage.setItem(key, JSON.stringify(value))
        window.dispatchEvent(new StorageEvent('storage')) //手动触发storage事件
    }
    //返回数据
    const res = useSyncExternalStore(subscribe, getShapshot)

    return [res, setStorage]
}