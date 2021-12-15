import React, { useState, useEffect } from 'react';
import PostService from './API/PostService';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/Loader/Loader';
import MyModal from './components/UI/MyModal/MyModal';
import useFetching from './hooks/useFetching';
import { usePosts } from './hooks/usePosts';

import './styles/App.css';
import { getPageCount, getPagesArray } from './utils/pages';


function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  //общее кол-во страниц для пагинации
  const [totalPages, setTotalPages] = useState(0);

  //лимит постов на странице для пагинации 
  const [limit, setLimit] = useState(10);
  //страница для пагинации
  const [page, setPage] = useState(1);


  //нужно использовать useMemo=>хук usePagination
  let pagesArray = getPagesArray(totalPages);

  //получение данных
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);

    //всего страниц
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });


  //для первоначального запроса постов с сервера. выполняются после рендеринга страницы
  useEffect(() => {
    fetchPosts();
  }, [page])



  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }


  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }


  const changePage = (page) => {
    setPage(page);
    //fetchPosts();
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

      {postError &&
        <h1>Произошла ошибка {postError}</h1>
      }
      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="СПИСОК ФРОНТЭНД" />
      }
      <div className='page__wrapper'>
        {
          pagesArray.map(p =>
            <span
              onClick={() => changePage(p)}
              key={p}
              className={page === p ? 'page page__current' : 'page'}>
              {p}
            </span>
          )
        }

      </div>


    </div>
  );
}

export default App;
