import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    username:'',
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        fatchUser:(state,action)=>{
            state.username=action.payload.username
        }
    }
})

export default userSlice.reducer
export const {fatchUser} = userSlice.actions