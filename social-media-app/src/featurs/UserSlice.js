import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    username:'',
    notification:0
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        fatchUser:(state,action)=>{
            state.username=action.payload.username
        },
        getnotification:(state,action)=>{
            state.notification= action.payload.numberofnotification
        }

    }
})

export default userSlice.reducer
export const {fatchUser,getnotification} = userSlice.actions