import {configureStore} from "@reduxjs/toolkit";
import counterReduce from '@/store/counterSlice'
import postsReduce from '@/store/posts'

export default configureStore({
  reducer: {
    counter: counterReduce,
    posts: postsReduce
  },
})
