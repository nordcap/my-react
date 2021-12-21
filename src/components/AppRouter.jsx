import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
//import { routes } from '../router';


const AppRouter = () => {
	return (
		<Routes>
			<Route path="/about" element={<About />} />
			<Route path="/posts" element={<Posts />} />
			<Route path="/posts/:id" element={<PostIdPage />} />
			<Route path="*" element={<Posts />} />
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