import { createSlice } from "@reduxjs/toolkit";

const updateUserInfo=(value)=>{
    const appDetail =JSON.parse(localStorage.getItem('AppDetail')) || {}
    appDetail['userInfo']=value
    localStorage.setItem('AppDetail', JSON.stringify(appDetail));
}

const initializeUserInfo=()=>{
    const appDetail = JSON.parse(localStorage.getItem('AppDetail')) || {};
    return appDetail.userInfo || null;
}

const userInfoSlice= createSlice({
    name:'userInfo',
    initialState:initializeUserInfo(),
    reducers:{
        setUserInfo(state,action){
            updateUserInfo(action.payload)
            return action.payload
        },
        clearUserInfo() {
            const appDetail = JSON.parse(localStorage.getItem('AppDetail')) || {};
            delete appDetail.userInfo;
            localStorage.setItem('AppDetail', JSON.stringify(appDetail));
            return null;
        }
    }
})

export const {setUserName, clearUserInfo} = userInfoSlice.actions

export default userInfoSlice.reducer
