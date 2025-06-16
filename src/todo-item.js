import React from 'react';

export const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
	const handleUpdate = () => {
		const newTitle = prompt('Новое название', todo.title);
		if (newTitle) {
			updateTodo(todo.id, newTitle);
		}
	};

	return (
		<li className="todo-item">
			{todo.title}
			<button onClick={handleUpdate}>Изменить</button>
			<button onClick={() => deleteTodo(todo.id)}>Удалить</button>
		</li>
	);
};
