import React from "react";

const Link = ({ active, children, onClick }) => {
	if (active) {
		return <li>{children}</li>;
	}

	return (
		<li>
			<a
				href="/"
				onClick={e => {
					e.preventDefault();
					onClick();
				}}
			>
				{children}
			</a>
		</li>
	);
};

export default Link;
