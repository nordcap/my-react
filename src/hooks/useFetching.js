import { useState } from 'react'

const useFetching = (callback) => {
	//состояние отвечающая за загрузку
	const [isLoading, setIsLoading] = useState(false);
	//обработка ошибок
	const [error, setError] = useState('');

	const fetching = async () => {
		try {
			setIsLoading(true);
			await callback();
		} catch (e) {
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	}

	return [fetching, isLoading, error];

}

export default useFetching
