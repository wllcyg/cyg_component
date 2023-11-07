import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
export const url = 'https://blogs.costlinecyg.top/comment/music?id=186016&limit=1'
const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]
export const postsSlice = createSlice({
  name:'posts',
  initialState,
  reducers:{
    // 基础版本
    // postAdd(state,{payload}){
    //   state.push(payload)
    // },
    postAdd:{
      reducer(state,{payload}){
        state.push(payload)
      },
      prepare(title,content){
        return {
          //统一进行逻辑控制
          payload:{
            id:nanoid(),
            title,
            content
          }
        }
      }
    }

  }
})
export const fetchPosts = createAsyncThunk('posts/async',async () =>{
  const res = await fetch(url)
  console.log(res,'这是一个测试都得异步')
  return res
})
export const { postAdd } = postsSlice.actions
export default postsSlice.reducer
