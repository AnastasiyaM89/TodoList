import React, { useState, useEffect } from 'react';
import { AddTodo } from './add-todo';
import { TodoList } from './todo-list';
import { SearchAndSort } from './search-sort';
import { useRequestTodos } from './use-request-todos';
import './App.css';

export const App = () => {
	const { todos, isLoading, error, addTodo, updateTodo, deleteTodo } =
		useRequestTodos();
	const [sortByAlphabet, setSortByAlphabet] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const handleSort = () => {
		setSortByAlphabet(!sortByAlphabet);
	};

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);
	const sortedTodos = sortByAlphabet
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div className="error-message">{error}</div>;
	}

	return (
		<div className="app-container">
			<h1>Список дел</h1>
			<AddTodo addTodo={addTodo} />
			<SearchAndSort setSearchQuery={setSearchQuery} handleSort={handleSort} />
			<TodoList
				todos={sortedTodos}
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
			/>
		</div>
	);
};
