import React, { useState, useEffect } from 'react';
import './App.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((data) => {
				setTodos(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	return (
		<div className="todo-list">
			<h1>Список дел</h1>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id} className="todo-item">
						{todo.title}
					</li>
				))}
			</ul>
		</div>
	);
};
