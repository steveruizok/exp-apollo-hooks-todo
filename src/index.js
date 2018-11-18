import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import App from "./components/App";
import { resolvers, defaults } from "./resolvers";

// Cache
const cache = new InMemoryCache();

// Type definitions
const typeDefs = `
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
  }

  type Query {
    visibilityFilter: String
    todos: [Todo]
  }
`;

// Create apollo client
const client = new ApolloClient({
	cache,
	link: withClientState({ resolvers, defaults, cache, typeDefs }),
});

// Render out app, wrapped in apollo provider
ReactDOM.render(
	<ApolloProvider client={client}>
		<ApolloHooksProvider client={client}>
			<App />
		</ApolloHooksProvider>
	</ApolloProvider>,
	document.getElementById("root")
);
