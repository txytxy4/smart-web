import {create} from 'zustand';

interface PriceStore {
    price: number;
    incrementPrice: () => void;
    decrementPrice: () => void;
    resetPrice: () => void;
    getPrice: () => number;
}

const usePriceStore = create<PriceStore>((set, get) => ({
    price: 0,
    incrementPrice: () => set((state) => ({price: state.price + 1})),
    decrementPrice: () => set((state) => ({ price: state.price - 1 })), // 更新状态
    resetPrice: () => set({ price: 0 }), // 重置状态
    getPrice: () => get().price, // 获取状态
})) 

export default usePriceStore;