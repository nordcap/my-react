import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

const PostFilter = ({ filter, setFilter }) => {
	return (
		<div>
			<MyInput
				value={filter.query}
				onChange={e => setFilter({ ...filter, query: e.target.value })}
				placeholder="Поиск по..." />

			<MySelect
				value={filter.sort}
				onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
				defaultValue="Сортировка по..."
				options={[
					{ name: 'по названию', value: 'title' },
					{ name: 'по описанию', value: 'body' }]}
			/>
		</div>
	)
}

export default PostFilter
