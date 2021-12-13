import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/MyModal/MyModal';
import { usePosts } from './hooks/hooks/usePosts';

import './styles/App.css';


function App() {



  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


  //для первоначального запроса постов с сервера. выполняются после рендеринга страницы
  useEffect(() => {
    fetchPosts();
  }, [])

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data);
  }

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }


  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }




  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <h1 className="head">Mое первое приложение на React</h1>

      <MyButton onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>


      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter} />

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="СПИСОК ФРОНТЭНД" />



    </div>
  );
}

export default App;
