import React from "react";
import gql from "graphql-tag";
import Todo from "./Todo";
import { useQuery } from "react-apollo-hooks";

const GET_TODOS = gql`
	{
		todos @client {
			id
			completed
			text
		}
		visibilityFilter @client
	}
`;

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case "SHOW_ALL":
			return todos;
		case "SHOW_COMPLETED":
			return todos.filter(t => t.completed);
		case "SHOW_ACTIVE":
			return todos.filter(t => !t.completed);
		default:
			throw new Error("Unknown filter: " + filter);
	}
};

const TodoList = () => {
	const { data, error } = useQuery(GET_TODOS);
	if (error) return `Error!`;

	const { todos, visibilityFilter } = data;

	return (
		<ul>
			{getVisibleTodos(todos, visibilityFilter).map(todo => (
				<Todo key={todo.id} {...todo} />
			))}
		</ul>
	);
};

export default TodoList;
