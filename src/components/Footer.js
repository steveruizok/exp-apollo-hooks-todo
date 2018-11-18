import React from "react";
import { useQuery, useApolloClient } from "react-apollo-hooks";
import gql from "graphql-tag";

import Link from "./Link";

// Grab the visibilityFilter property from the client
const GET_VISIBILITY_FILTER = gql`
	{
		visibilityFilter @client
	}
`;

const FilterLink = ({ filter, children }) => {
	const client = useApolloClient();

	const { data, error } = useQuery(GET_VISIBILITY_FILTER);
	if (error) return `Error!`;

	return (
		<Link
			onClick={() => {
				client.writeData({ data: { visibilityFilter: filter } });
			}}
			active={data.visibilityFilter === filter}
		>
			{children}
		</Link>
	);
};

const Footer = () => (
	<div>
		<p>Show:</p>
		<ul>
			<FilterLink filter="SHOW_ALL">All</FilterLink>
			<FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
			<FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
		</ul>
	</div>
);

export default Footer;
