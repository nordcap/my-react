import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import Login from '../pages/Login';
import { AuthContext } from '../context';
//import { routes } from '../router';


const AppRouter = () => {
	const { isAuth } = useContext(AuthContext);

	return (

		isAuth
			?
			<Routes>
				<Route path="/about" element={<About />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/posts/:id" element={<PostIdPage />} />
				<Route path="*" element={<Posts />} />
			</Routes >
			:
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<Login />} />
			</Routes>
	)
}

export default AppRouter

/*
			1 вариант

			<Route path="/about" element={<About />} />
			<Route path="/posts" element={<Posts />} />
			<Route path="/posts/:id" element={<PostIdPage />} />
			<Route path="*" element={<Posts />} />


			2 вариант

			{routes.map(route =>
				<Route
					path={route.path}
					element={route.element}
				/>
			)}

*/