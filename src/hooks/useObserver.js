import { useEffect, useRef } from 'react';

export const useObserver = (ref, canLoad, isLoading, callback) => {
	const observer = useRef();
	useEffect(() => {
		if (isLoading) return;
		//отключ наблюдение за эл-ми, если обзервер создан
		if (observer.current) observer.current.disconnect();
		var cb = function (entries, observer) {
			if (entries[0].isIntersecting && canLoad) {
				//обрабатываем только зону видимости
				callback();
			}
		}
		observer.current = new IntersectionObserver(cb);
		observer.current.observe(ref.current);

	}, [isLoading])
}