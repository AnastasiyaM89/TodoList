import React from 'react';

export const TodoList = ({ todos, updateTodo, deleteTodo }) => {
	return (
		<ul>
			{todos.map((todo) => (
				<li key={todo.id}>
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
	);
};
