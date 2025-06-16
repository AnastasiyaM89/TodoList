import { useState, useEffect } from 'react';

export const useRequestTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = () => {
		setIsLoading(true);
		fetch('http://localhost:3003/todos')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Ошибка: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setTodos(data);
				setIsLoading(false);
				setError(null);
			})
			.catch((error) => {
				setError('Не удалось получить список задач');
				setIsLoading(false);
			});
	};

	const addTodo = (newTodo) => {
		return fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: newTodo, completed: false }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Ошибка: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setTodos((prevTodos) => [...prevTodos, data]);
				setError(null);
				return data;
			})
			.catch((error) => {
				setError('Не удалось добавить задачу');
				return null;
			});
	};

	const updateTodo = (id, newTitle) => {
		return fetch(`http://localhost:3003/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: newTitle }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Ошибка: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setTodos((prevTodos) =>
					prevTodos.map((todo) =>
						todo.id === id ? { ...todo, title: data.title } : todo,
					),
				);
				setError(null);
				return data;
			})
			.catch((error) => {
				console.error('Ошибка при обновлении задачи', error);
				setError('Не удалось обновить задачу');
				return null;
			});
	};

	const deleteTodo = (id) => {
		return fetch(`http://localhost:3003/todos/${id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Ошибка: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
				setError(null);
				return true;
			})
			.catch((error) => {
				setError('Ошибка при удалении задачи');
				return false;
			});
	};

	return { todos, isLoading, error, addTodo, updateTodo, deleteTodo };
};
