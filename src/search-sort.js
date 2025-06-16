import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

export const SearchAndSort = ({
	setTodos,
	setSortByAlphabet,
	setSearchQuery,
	handleSort,
}) => {
	const [currentSearchTerm, setCurrentSearchTerm] = useState('');

	const debouncedSetSearchQuery = useCallback(
		debounce((query) => {
			setSearchQuery(query);
		}, 300),
		[setSearchQuery],
	);

	const performSearch = () => {
		debouncedSetSearchQuery(currentSearchTerm);
	};

	const clearSearch = () => {
		setCurrentSearchTerm('');
		debouncedSetSearchQuery('');
	};

	const handleSearchInputChange = (event) => {
		setCurrentSearchTerm(event.target.value);
	};

	return (
		<div>
			<input
				type="text"
				value={currentSearchTerm}
				onChange={handleSearchInputChange}
				placeholder="Введите текст для поиска"
			/>
			<button onClick={performSearch}>Поиск</button>
			<button onClick={clearSearch}>Очистить</button>
			<button onClick={handleSort}>Сортировать по алфавиту</button>
		</div>
	);
};
