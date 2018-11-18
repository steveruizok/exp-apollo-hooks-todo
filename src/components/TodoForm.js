import React, { useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

const ADD_TODO = gql`
	mutation addTodo($text: String!) {
		addTodo(text: $text) @client {
			id
		}
	}
`;

const TodoForm = () => {
	const addTodo = useMutation(ADD_TODO);
	const input = useRef();

	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault();
					// Bail if input is empty space
					if (!input.current.value.trim()) {
						return;
					}

					// run our add todo mutation
					addTodo({ variables: { text: input.current.value } });

					// Reset the input value
					input.current.value = "";
				}}
			>
				<input ref={input} />
				<button type="submit">Add Todo</button>
			</form>
		</div>
	);
};

export default TodoForm;
