import {Button, Card} from "antd";
import { useDispatch, useSelector} from 'react-redux'
import {increment,incrementByAmount,decrement} from "@/store/counterSlice";
import {postAdd,fetchPosts} from "@/store/posts";
import {useEffect} from "react";
const ReduxEx = () => {
  const count = useSelector(state => state.counter.value)
  const posts = useSelector(state => state.posts)
  console.log(posts)
  const dispatch = useDispatch()
  const Random = () =>{
    const count = Math.floor((Math.random()*10))
    dispatch(incrementByAmount(count))
  }
  const addPost = () => {
    dispatch(postAdd('张三的文章','测试的文章!'))
  }
  useEffect( () => {
    console.log(dispatch(fetchPosts()))
  }, []);
  return (
    <div>
      <Card title='redux简单1使用'>
        <Button onClick={() => dispatch(increment())}> 功德 +1 --- {count}</Button>
        <Button style={{margin:'0 12px'}} onClick={() =>dispatch(decrement())}> 功德 -1 {count}</Button>
        <Button onClick={() => Random()}> 功德 随机 {count} </Button>
      </Card>
      <Card style={{marginTop:'12px'}} title='posts'>
        <ul>
          {
            posts.map(e =>{
              return (
                <li key={e.id}>名称: {e.title} ; =--- 内容 {e.content}</li>
              )
            })
          }
        </ul>
        <Button onClick={() => addPost()}>添加文章</Button>
      </Card>
    </div>
  );
};

export default ReduxEx;
