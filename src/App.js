import React, { useState, useEffect } from 'react';
import PostService from './API/PostService';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/Loader/Loader';
import MyModal from './components/UI/MyModal/MyModal';
import { usePosts } from './hooks/hooks/usePosts';

import './styles/App.css';


function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  //для первоначального запроса постов с сервера. выполняются после рендеринга страницы
  useEffect(() => {
    fetchPosts();
  }, [])

  async function fetchPosts() {
    setIsPostsLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts);
    setIsPostsLoading(false);
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

      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="СПИСОК ФРОНТЭНД" />
      }




    </div>
  );
}

export default App;
