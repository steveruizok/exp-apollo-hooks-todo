import gql from "graphql-tag";

// default values
export const defaults = {
	todos: [],
	visibilityFilter: "SHOW_ALL",
};

// something to bump for todo iids
let nextTodoId = 0;

export const resolvers = {
	Mutation: {
		addTodo: (_, { text }, { cache }) => {
			const query = gql`
				query GetTodos {
					todos @client {
						id
						next
						completed
					}
				}
			`;

			const previous = cache.readQuery({ query });

			const newTodo = {
				id: nextTodoId++,
				text,
				completed: false,
				__typename: "TodoItem",
			};

			const data = {
				todos: previous.todos.concat([newTodo]),
			};

			cache.writeData({ data });

			return newTodo;
		},
		toggleTodo: (_, variables, { cache }) => {
			// Invert the completed property on a todo:
			// Query from cache and store as a local variable,
			// change the completed property on that local variable,
			// and write it back to the cache

			// Prepare a query string to pull the completed property
			// from a todo item
			const fragment = gql`
				fragment completeTodo on TodoItem {
					completed
				}
			`;

			// Prepare the id string for the cache fragment query
			const id = `TodoItem:${variables.id}`;

			// Read the fragment from the cache
			const todo = cache.readFragment({ fragment, id });

			// Create a new copy of the todo with the completed property inverted
			const data = { ...todo, completed: !todo.completed };

			// Write this new copy to the cache using the id string
			cache.writeData({ id, data });
			return null;
		},
	},
};
