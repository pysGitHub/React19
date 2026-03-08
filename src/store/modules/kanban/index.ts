import { createSlice } from "@reduxjs/toolkit";
 

const KanbanData = createSlice({ 
    name: "kanbanData",
    initialState: {
        menuData: (() => {
            const storedData = localStorage.getItem('menuData');
            if (storedData && storedData !== 'undefined' && storedData !== 'null') {
                try {
                    return JSON.parse(storedData);
                } catch (e) {
                    console.error('Failed to parse menuData from localStorage:', e);
                    localStorage.removeItem('menuData');
                    return [];
                }
            }
            return [];
        })(),
    },
    reducers: {
        setKanbanData: (state, action) => {
            state.menuData = action.payload
            // 存入本地,防止页面刷新数据丢失
            localStorage.setItem('menuData', JSON.stringify(action.payload))
        },

        resetKanbanData: (state) => {
            state.menuData = []
            localStorage.removeItem('menuData')
        }
    }
})


export const { setKanbanData, resetKanbanData } = KanbanData.actions
export default KanbanData.reducer