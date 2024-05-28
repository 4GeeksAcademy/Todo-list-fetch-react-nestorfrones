import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";


const Home = () => {

	const [menssagge, setMenssagge] = useState(false);
	const [list, setList] = useState([]);
	const [listItem, setListItem] = useState(
		{
			"label": "",
			"is_done": false
		}
	);

	function addItemList(event) {
		setListItem({ ...listItem, [event.target.name]: event.target.value })
	}


	async function getList() {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/nestor-frones");
			const data = await response.json();
			setList(data.todos);
			if (data.todos.length === 0) setMenssagge(true);
		} catch (e) {
			console.log(e);
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()
		const response = await fetch("https://playground.4geeks.com/todo/todos/nestor-frones", {
			method: "POST",
			body: JSON.stringify(listItem),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (response.ok) {
			getList();
			setMenssagge(false);
		} else {
			alert("no se puede crear");
		}
	}


	async function deleteItemList(element) {
		const response = await fetch('https://playground.4geeks.com/todo/todos/'+`${element.id}`, {
			method: "DELETE",
		})
		if (response.ok) {
			getList();
		} else {
			alert("no se puede eliminar");
		}
	}

	


	useEffect(() => {
		getList();
	}, []);



	return (
		<div className="container my-5">
			<div className="card border-0 shadow py-3 mb-5 bg-body-tertiary">
				<h1 className="title text-center p-3">todos</h1>
				<form onSubmit={(event) => handleSubmit(event)}>
					<input className="w-100 p-3 border" type="text" value={listItem.label} name="label" placeholder="ingrese tarea" onChange={(event) => addItemList(event)} />
				</form>
				<ul className="list-group list-group-flush w-100 d-flex justify-content-between">
					<h5 className={menssagge ? "" : "d-none"}>No hay tareas pendientes</h5>
					<ListItem list={list} delete={deleteItemList} />
				</ul>
				<div id="emailHelp" className={menssagge ? "d-none form-text" : "form-text"}> Quedan {list.length} tareas pendientes!</div>
			</div>
		</div>
	)
};

export default Home;











