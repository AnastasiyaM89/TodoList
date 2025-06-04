import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import './App.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentSearchTerm, setCurrentSearchTerm] = useState('');
	const [sortByAlphabet, setSortByAlphabet] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const debouncedSetSearchQuery = useCallback(
		debounce((query) => {
			setSearchQuery(query);
		}, 300),
		[],
	);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = () => {
		setIsLoading(true);
		fetch('http://localhost:3003/todos')
			.then((response) => response.json())
			.then((data) => {
				setTodos(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching todos:', error);
				setIsLoading(false);
			});
	};

	const addTodo = () => {
		fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: newTodo, completed: false }),
		})
			.then((response) => response.json())
			.then((data) => {
				setTodos([...todos, data]);
				setNewTodo('');
			});
	};

	const updateTodo = (id, newTitle) => {
		fetch(`http://localhost:3003/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: newTitle }),
		})
			.then((response) => response.json())
			.then((data) => {
				setTodos(
					todos.map((todo) =>
						todo.id === id ? { ...todo, title: data.title } : todo,
					),
				);
			});
	};

	const deleteTodo = (id) => {
		fetch(`http://localhost:3003/todos/${id}`, {
			method: 'DELETE',
		}).then(() => {
			setTodos(todos.filter((todo) => todo.id !== id));
		});
	};

	const handleSearchInputChange = (event) => {
		setCurrentSearchTerm(event.target.value);
	};

	const performSearch = () => {
		debouncedSetSearchQuery(currentSearchTerm);
	};

	const clearSearch = () => {
		setCurrentSearchTerm('');
		debouncedSetSearchQuery('');
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

	return (
		<div className="app-container">
			<h1>Список дел</h1>
			<div>
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Новое дело"
				/>
				<button onClick={addTodo}>Добавить</button>
			</div>
			<div>
				<input
					type="text"
					value={currentSearchTerm}
					onChange={handleSearchInputChange}
					placeholder="Введите текст для поиска"
				/>
				<button onClick={performSearch}>Поиск</button>
				<button onClick={clearSearch}>Очистить</button>
				<button onClick={() => setSortByAlphabet(!sortByAlphabet)}>
					{sortByAlphabet ? 'Скрыть сортировку' : 'Показать сортировку'}
				</button>
			</div>
			<ul>
				{sortedTodos.map((todo) => (
					<li key={todo.id} className="todo-item">
						{todo.title}
						<button
							onClick={() => {
								const newTitle = prompt('Новое название', todo.title);
								if (newTitle) {
									updateTodo(todo.id, newTitle);
								}
							}}
						>
							Изменить
						</button>
						<button onClick={() => deleteTodo(todo.id)}>Удалить</button>
					</li>
				))}
			</ul>
		</div>
	);
};
