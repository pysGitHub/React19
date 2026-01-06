import { createSlice } from "@reduxjs/toolkit";
 

const KanbanData = createSlice({ 
    name: "kanbanData",
    initialState: {
        menuData: (
            localStorage.getItem('menuData') ? 
            JSON.parse(localStorage.getItem('menuData') as string) : 
            []
        ),
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