import React, { Component } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";

class App extends Component {
	render() {
		return (
			<div className="App">
				<TodoForm />
				<TodoList />
				<Footer />
			</div>
		);
	}
}

export default App;
