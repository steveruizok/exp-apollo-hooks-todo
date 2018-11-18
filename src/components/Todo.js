import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

const TOGGLE_TODO = gql`
	mutation ToggleTodo($id: Int!) {
		toggleTodo(id: $id) @client
	}
`;

const Todo = ({ id, completed, text }) => {
	const toggleTodo = useMutation(TOGGLE_TODO, { variables: { id: id } });

	return (
		<li
			onClick={toggleTodo}
			style={{ textDecoration: completed ? "line-through" : "none" }}
		>
			{text}
		</li>
	);
};

export default Todo;
