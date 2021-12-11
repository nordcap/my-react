import React, { useMemo, useState } from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';


function App() {



  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'description' },
    { id: 2, title: 'TypeScript', body: 'description' },
  ]);
  // const [selectedSort, setSelectedSort] = useState('');
  // const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({ sort: '', query: '' });



  const sortedPost = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]);


  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPost.filter(post => post.title.toLowerCase().includes(filter.query));
  }, [filter.query, sortedPost]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }


  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }


  return (
    <div className="App">
      <h1 className="head">Mое первое приложение на React</h1>

      <PostForm create={createPost} />

      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter} />

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="СПИСОК ФРОНТЭНД" />



    </div>
  );
}

export default App;
