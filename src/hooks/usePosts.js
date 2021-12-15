import { useMemo } from 'react';

//массив отсортированных постов
export const useSortedPosts = (posts, sort) => {
	const sortedPost = useMemo(() => {
		if (sort) {
			return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
		}
		return posts;
	}, [sort, posts]);

	return sortedPost;


}


//массив отсортированных и отфильтрованных постов
export const usePosts = (posts, sort, query) => {
	const sortedPosts = useSortedPosts(posts, sort);
	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(query));
	}, [query, sortedPosts]);

	return sortedAndSearchedPosts;
}
