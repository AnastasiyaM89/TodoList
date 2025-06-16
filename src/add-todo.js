import React, { useState } from 'react';

export const AddTodo = ({ addTodo }) => {
	const [newTodo, setNewTodo] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newTodo.trim() !== '') {
			addTodo(newTodo)
				.then(() => {
					setNewTodo('');
				})
				.catch((error) => {
					console.error('Ошибка при добавлении задачи:', error);
				});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={newTodo}
				onChange={(event) => setNewTodo(event.target.value)}
				placeholder="Новое дело"
			/>
			<button type="submit">Добавить</button>
		</form>
	);
};
