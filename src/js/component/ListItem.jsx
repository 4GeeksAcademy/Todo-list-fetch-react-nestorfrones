import React from "react";



const ListItem = (props) => {
	return (
		props.list.map((element) => {
			return (
				<li key={element.id} className="d-flex justify-content-between">
					<span className="list-group-item w-100 border-end-0 border-start py-3">{element.label}</span>
				    <button onClick={()=> props.delete(element)} className="btn border border border-start-0 rounded-0">X</button>
				</li>
			)
		})
	)
}


export default ListItem;