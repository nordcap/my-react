import React, { useRef, useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';


function App() {



  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'description' },
    { id: 2, title: 'TypeScript', body: 'description' },
  ]);


  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }


  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const [selectedSort, setSelectedSort] = useState('')


  const sortPosts = (sort) => {
    setSelectedSort(sort);

    setPosts([...posts].sort((a, b) =>
      a[sort].localeCompare(b[sort])));
    //console.log(sort);

  }

  return (
    <div className="App">
      <h1 className="head">Mое первое приложение на React</h1>

      <PostForm create={createPost} />

      <hr style={{ margin: '15px 0' }} />

      <MySelect
        value={selectedSort}
        onChange={sortPosts}
        defaultValue="Сортировка по..."
        options={[
          { name: 'по названию', value: 'title' },
          { name: 'по описанию', value: 'body' }]}
      />

      {
        posts.length !== 0
          ? <PostList remove={removePost} posts={posts} title="СПИСОК ФРОНТЭНД" />
          : <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
      }


    </div>
  );
}

export default App;
